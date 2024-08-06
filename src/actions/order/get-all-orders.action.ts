"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { APP_CONST } from "@/config";
import { getActionError, initResponseAction } from "@/utils";
import { IPagination, IResponseAction } from "@/interfaces";


export const getAllOrders = async (
    applyPagination:boolean = false,
    pagination?:IPagination,
):Promise<IResponseAction> => {
    return _getAllOrders('all', applyPagination, pagination)
}

export const getAllOrdersByUser = async (
    applyPagination:boolean = false,
    pagination?:IPagination,
):Promise<IResponseAction> => {
    return _getAllOrders('byUser', applyPagination, pagination)
}

const _getAllOrders = async (
    filter:'all'|'byUser' = "all",
    applyPagination:boolean = false,
    pagination?:IPagination,
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    // 0. Obtener datos de pagination o default
    let page, take, skip;
    if (!applyPagination) {
        take = undefined;
        skip = 0;
        page = 1;
    } else {
        page = pagination?.page ?? 1;
        take = pagination?.take ?? APP_CONST.pagination.take;
        skip = (page - 1) * take;
    }

    // 1. Validar page y take
    if (page < 1) page = 1;

    try {
        // 2 validaciones auth
        const session = await auth();

        if (!session) {
            resp.errorCode = APP_CONST.errorCode.unAuthenticated;
            throw new Error("Usuario no autenticado");
        }

        if (
            filter == "all" &&
            session.user.role !== APP_CONST.userRole.admin
        ) {
            resp.errorCode = APP_CONST.errorCode.unAuthorized;
            throw new Error("Usuario no autorizdo");
        }

        const user_id = session.user.id;

        // 3. query
        const orders = await prisma.order.findMany({
            take,
            skip,
            where: {
                ...(filter == "byUser"
                    ? {
                          user_id,
                      }
                    : {}),
            },
            include: {
                OrderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // 4. Obtener datos de paginación
        if (applyPagination) {
            const productCount = await prisma.order.count({
                where: {
                    ...(filter == "byUser"
                        ? {
                              user_id,
                          }
                        : {}),
                },
            });
            const totalPages = Math.ceil(productCount / take!);

            resp.pagination = {
                currentPage: page,
                totalPages: totalPages!,
            };
        }

        resp.success = true;
        resp.data = orders;
        
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
