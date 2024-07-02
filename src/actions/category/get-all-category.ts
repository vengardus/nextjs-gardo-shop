"use server";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";

export const getAllCategory = async (): Promise<IResponseAction> => {
    const resp = initResponseAction();

    try {
        const data = await prisma.category.findMany({
            orderBy: { name: "asc" },
        });

        resp.success = true
        resp.data = data
    } catch (error) {
        resp.message = getActionError(error)
    }

    return resp;
};
