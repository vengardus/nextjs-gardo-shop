"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { APP_CONST } from "@/config/configApp";
import type { IAddress } from "@/interfaces/address.interface";
import type { Size } from "@/interfaces/product.interface";
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
    const session = await auth();
    const user_id = session?.user.id;

    // 1. Verificar usuario
    if (!user_id) {
        return {
            success: false,
            message: "No hay sesipon de usuario",
        };
    }

    // Obtener la información de los productos
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

    // 4. Caclcular subTotal, tax y total
    const { subTotal, tax, total, error, message } = productsToOrder.reduce(
        (accum, current) => {
            const product = products.find(
                (product) => product.id === current.product_id
            );
            if (!product) {
                accum.error = true;
                accum.message = `Error: Producto ${current.product_id} no existe.`;
                return accum;
            }
            accum.subTotal += current.quantity * product.price;
            accum.tax = (accum.subTotal * (APP_CONST.igv / 100));
            accum.total = accum.subTotal * (1 + APP_CONST.igv / 100);
            return accum;
        },
        { subTotal: 0, tax: 0, total: 0, error: false, message: "" }
    );

    if (error) {
        return {
            success: false,
            message,
        };
    }

    return {
        success: true,
        data: {
            productsToOrder,
            products,
            address,
            user_id,
            subTotal,
            tax,
            total,
        },
    };
};
