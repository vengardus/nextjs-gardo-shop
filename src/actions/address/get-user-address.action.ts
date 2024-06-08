"use serrver";

import { IResponseAction } from "@/interfaces/response.interface";
import prisma from "@/lib/prisma";

export const getUserAddress = async (
    user_id: string
): Promise<IResponseAction> => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: { user_id },
        });

        return {
            success: true,
            data: address,
        };
    } catch (error) {
        console.error("No se pudo recuperar dirección", error);

        return {
            success: false,
            message: "No se pudo recuperar dirección",
        };
    }
};
