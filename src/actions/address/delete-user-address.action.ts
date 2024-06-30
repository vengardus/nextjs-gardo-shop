"use server";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";

export const deleteUserAddress = async (
    user_id: string
): Promise<IResponseAction> => {
    
    try {
        await prisma.userAddress.delete({
            where:{user_id}
        })

        return {
            success:true
        }

    } catch (error) {
        console.log("No se pudo eliminar dirección", error);

        return {
            success: false,
            message: "No se pudo eliminar dirección",
        };
    }
};
