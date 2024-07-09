"use server";

import prisma from "@/lib/prisma";
import type { IResponseAction } from "@/interfaces/app/response.interface";
import { initResponseAction } from "@/utils/initResponseAction";
import { getActionError } from "@/utils/getActionError";


export const getCountryAll = async ():Promise<IResponseAction> => {
    const resp = initResponseAction()

    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: "asc"
            }
        });

        resp.success = true
        resp.data = countries
    } catch (error) {
        //console.error(error);

        resp.message = `Error al recuperar countries: ${getActionError(error)}`
    }

    return resp
};
