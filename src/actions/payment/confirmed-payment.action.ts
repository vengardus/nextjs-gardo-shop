"use server";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";
import { revalidatePath } from "next/cache";

export const confirmedPayment = async (
    orderId: string
): Promise<IResponseAction> => {
    const resp = initResponseAction()

    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                updateAt: new Date(),
            },
        });

        if (!order)
            throw new Error(`Error al confirmar pago de la orden ${orderId}`);

        resp.success = true;
        resp.data = order;

        console.log('newOrder', resp.data)
        // TODO: Revalidar un path
        revalidatePath(`/orders/${ orderId }`);

    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
