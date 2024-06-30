"use server";

import { auth } from "@/auth";
import { APP_CONST } from "@/config/configApp";
import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";
import { isUserAdmin } from "../auth/is-user-admin.action";

interface IPaginationOptions {
    page?: number;
    take?: number;
}

export const getAllUsers = async ({
    page = 1,
    take = APP_CONST.pagination.take,
}: IPaginationOptions): Promise<IResponseAction> => {
    const resp = initResponseAction();

    // PAGINACION: Validar page y take
    if (page < 1) page = 1;

    try {
        const respAuth = await isUserAdmin(resp);
        if (!respAuth.success) throw new Error(respAuth.resp.message);

        const users = await prisma.user.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: {
                name: "asc",
            },
        });

        // PAGINACION: Obtener número de paginas
        const count = await prisma.user.count();
        const totalPages = Math.ceil(count / take);
        
        // Definir respuesta
        resp.success = true;
        resp.data = users,
        resp.pagination!.currentPage = page,
        resp.pagination!.totalPages = totalPages

    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
