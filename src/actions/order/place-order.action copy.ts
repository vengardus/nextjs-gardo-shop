"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { APP_CONST } from "@/config/configApp";
import type { IAddress } from "@/interfaces/address.interface";
import type { IProduct, Size } from "@/interfaces/product.interface";
import type { IResponseAction } from "@/interfaces/response.interface";

export interface IProductToOrder {
    product_id: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async (
    productsToOrder: IProductToOrder[],
    address: IAddress
): Promise<IResponseAction> => {
    const resp: IResponseAction = {
        success: false,
        message: '',
        data: null,
    };

    try {
        // 0. Verificar usuario
        const session = await auth();
        const user_id = session?.user.id;
        if (!user_id) throw new Error("No hay sesión de usuario.");

        // 1. Obtener la información de los productos
        // Recordar que se puede llevar mas de 1 producto con el mismo id
        const products = await prisma.product.findMany({
            where: {
                id: {
                    in: productsToOrder.map((item) => item.product_id),
                },
            },
        });

        // 3. Obtener número total de items
        const countItemsInOrder = productsToOrder.reduce(
            (accum, current) => accum + current.quantity,
            0
        );

        // 4. Calcular subTotal, tax y total
        const { subTotal } = productsToOrder.reduce(
            (accum, current) => {
                const product = products.find(
                    (product) => product.id === current.product_id
                );
                if (!product)
                    throw new Error(
                        `Producto ${current.product_id} no existe.`
                    );

                accum.subTotal += current.quantity * product.price;

                return accum;
            },
            { subTotal: 0 }
        );
        const tax = subTotal * (APP_CONST.igv / 100);
        const total = subTotal * (1 + APP_CONST.igv / 100);

        // 5. Crear la tramnsacción de BD
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 5.1 Actualizar stock de productos

            const updateProductsPromises = products.map((product) => {
                //  acumular los valores
                const productQuantity = productsToOrder
                    .filter((item) => item.product_id === product.id)
                    .reduce((accum, current) => accum + current.quantity, 0);

                if (!productQuantity)
                    throw new Error(
                        `Producto ${product.id} no tiene cantidad definida`
                    );

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // in_stock: product.in_stock - productQuantity, // NO HACER
                        in_stock: {
                            decrement: productQuantity,
                        },
                    },
                });
            });

            const updateProducts = await Promise.all(updateProductsPromises);

            // verificarsi hay valores negativos de stock
            updateProducts.forEach((product) => {
                if (product.in_stock < 0)
                    throw new Error(
                        `${product.title} no tiene inventario suficiente`
                    );
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
                            data: productsToOrder.map((item) => ({
                                product_id: item.product_id,
                                quantity: item.quantity,
                                size: item.size,
                                price:
                                    products.find(
                                        (product) =>
                                            product.id === item.product_id
                                    )?.price ?? 0,
                            })),
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
                updateProducts
            }
            
        });

        resp.success = true
        resp.data = {
            subTotal,
            tax,
            total,
            prismaTx: prismaTx,
            order: prismaTx.order

        }

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
