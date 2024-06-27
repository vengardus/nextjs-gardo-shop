"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { IResponseAction } from "@/interfaces/response.interface";
import { getActionError } from "@/utils/getActionError";
import { APP_CONST } from "@/config/configApp";


export const getAllOrdes = async (): Promise<IResponseAction> => {
    const resp: IResponseAction = {
        success: false,
    };

    try {
        const session = await auth();
        if (!session) {
            resp.errorCode = APP_CONST.errorCode.unAuthenticated;
            throw new Error("Usuario no autenticado");
        }
        if (session.user.role !== APP_CONST.userRole.admin) {
            resp.errorCode = APP_CONST.errorCode.unAuthorized;
            throw new Error("Usuario no autorizdo");
        }
        const user_id = session.user.id;

        const orders = await prisma.order.findMany({
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

        resp.data = orders;
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
