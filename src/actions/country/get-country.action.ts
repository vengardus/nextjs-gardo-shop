"use server";

import prisma from "@/lib/prisma";
import type { IResponseAction } from "@/interfaces/response.interface";


export const getCountryAll = async ():Promise<IResponseAction> => {
    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: "asc"
            }
        });

        return {
            success: true,
            data: countries,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Error al recuperar countries",
        };
    }
};
