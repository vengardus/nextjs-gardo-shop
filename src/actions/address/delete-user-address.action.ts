"use server";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";

export const deleteUserAddress = async (
    user_id: string
): Promise<IResponseAction> => {
    const resp = initResponseAction()
    
    try {
        await prisma.userAddress.delete({
            where:{user_id}
        })

        resp.success = true

    } catch (error) {
        //console.log("No se pudo eliminar dirección", error);
        resp.message = getActionError(error)
    }

    return resp
};
