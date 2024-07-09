"use serrver";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";

export const getUserAddress = async (
    user_id: string
): Promise<IResponseAction> => {
    const resp = initResponseAction()

    try {
        const address = await prisma.userAddress.findUnique({
            where: { user_id },
        });

        resp.success = true
        resp.data = address
    } 
    catch (error) {
        //console.error("No se pudo recuperar dirección", error);
        resp.message = getActionError(error)
    }

    return resp
};
