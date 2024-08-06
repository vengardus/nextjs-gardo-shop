"use server";

import { auth } from "@/auth";
import { APP_CONST } from "@/config";
import { IResponseAction } from "@/interfaces";

export const isUserAdmin = async (
    resp: IResponseAction
): Promise<{
    success: boolean;
    resp: IResponseAction;
}> => {
    const session = await auth();
    let success = false;
    if (!session || session.user.role !== APP_CONST.userRole.admin) {
        resp.errorCode = APP_CONST.errorCode.unAuthorized;
        resp.message = "Usuario no autorizado";
    } else success = true;

    return {
        success,
        resp,
    };
};
