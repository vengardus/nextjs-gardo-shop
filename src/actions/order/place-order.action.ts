"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { APP_CONST } from "@/config";
import { initResponseAction } from "@/utils";
import type { IAddress, IResponseAction, Size } from "@/interfaces";

export interface IProductToOrder {
    product_id: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (
    productsToOrder: IProductToOrder[],
    address: IAddress
): Promise<IResponseAction> => {
    const resp = initResponseAction()
    try {
        // 0. Verificar usuario
        const session = await auth();
        const user_id = session?.user.id;
        if (!user_id) throw new Error("No hay sesión de usuario.");

        // 1. Obtener la información de los productos
        // (Recordar que se puede llevar mas de 1 producto con el mismo id)

        // Extraer los IDs únicos de los productos a ordenar
        const productIds = Array.from(
            new Set(productsToOrder.map((item) => item.product_id))
        );

        // Buscar los productos en la base de datos utilizando Prisma
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds,
                },
            },
        });

        // 3. Obtener número total de items
        // Obtener el número total de ítems en el pedido
        const countItemsInOrder = productsToOrder.reduce(
            (total, item) => total + item.quantity,
            0
        );

        // 4. Calcular subTotal, tax y total
        // Calcular subTotal
        const subTotal = productsToOrder.reduce((accum, current) => {
            const product = products.find(
                (product) => product.id === current.product_id
            );
            if (!product) {
                throw new Error(`Producto ${current.product_id} no existe.`);
            }
            return accum + current.quantity * product.price;
        }, 0);

        // Calcular tax y total
        const tax = subTotal * (APP_CONST.igv / 100);
        const total = subTotal * (1 + APP_CONST.igv / 100);

        // 5. Crear la transacción de BD
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 5.1 Actualizar stock de productos

            const updateProductsPromises = products.map((product) => {
                // Verificar cantidad definida
                const productQuantity = productsToOrder
                    .filter((i) => i.product_id === product.id)
                    .reduce((accum, current) => accum + current.quantity, 0);
                if (!productQuantity) {
                    throw new Error(
                        `Producto ${product.id} no tiene cantidad definida.`
                    );
                }

                // Actualizar stock del producto
                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        in_stock: {
                            decrement: productQuantity,
                        },
                    },
                });
            });

            // ejecutar las promesas
            const updateProducts = await Promise.all(updateProductsPromises);

            // Verificar si hay valores negativos de stock
            updateProducts.forEach((product) => {
                if (product.in_stock < 0) {
                    throw new Error(
                        `${product.title} no tiene inventario suficiente`
                    );
                }
            });

            // 5.2 Crear la orden - encebezado - detalle
            const order = await tx.order.create({
                data: {
                    user_id: user_id,
                    itemsInOrder: countItemsInOrder,
                    subTotal,
                    tax,
                    total,
                    OrderItem: {
                        createMany: {
                            data: productsToOrder.map((item) => {
                                const product = products.find(
                                    (p) => p.id === item.product_id
                                );
                                if (!product) {
                                    throw new Error(
                                        `Producto ${item.product_id} no existe.`
                                    );
                                }
                                if (product.price <= 0) {
                                    throw new Error(
                                        `Producto ${product.id} tiene un precio inválido.`
                                    );
                                }
                                return {
                                    product_id: item.product_id,
                                    quantity: item.quantity,
                                    size: item.size,
                                    price: product.price,
                                };
                            }),
                        },
                    },
                },
            });

            // Validar si no se encontró algun producto (price=0)

            // 5.3 Crear la dirección de la orden
            const orderAddress = await tx.orderAddress.create({
                data: {
                    address: address.address,
                    address2: address.address2,
                    firstName: address.firstName,
                    lastName: address.lastName,
                    city: address.city,
                    postalCode: address.postalCode,
                    phone: address.phone,
                    country_id: address.country,
                    order_id: order.id,
                },
            });

            return {
                order,
                orderAddress,
                updateProducts,
            };
        });

        resp.success = true;
        resp.data = {
            subTotal,
            tax,
            total,
            prismaTx: prismaTx,
            order: prismaTx.order,
        };
    } catch (error) {
        if (error instanceof Error) {
            // Aquí sabemos que `error` es una instancia de Error
            resp.message = error.message;
            console.error(error.message);
        } else {
            resp.message = "Ocurrió algún error";
            console.error(`${resp.message}:${error}`);
        }
    }

    console.log(resp);

    return resp;
};
