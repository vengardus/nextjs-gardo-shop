"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import type { IResponseAction } from "@/interfaces/response.interface";
import type { UserRole } from "@/interfaces/user.interface";
import { APP_CONST } from "@/config/configApp";
import { revalidatePath } from "next/cache";
import { initResponseAction } from "@/utils/initResponseAction";
import { isUserAdmin } from "../auth/is-user-admin.action";

export const updateUserRole = async (
    userId: string,
    role: UserRole
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    try {
        const respAuth = await isUserAdmin(resp);
        if (!respAuth.success) throw new Error(respAuth.resp.message);

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                role: role,
            },
        });
        if (!user) throw new Error("No se pudo actualiar role de usuario");

        resp.success = true;
        resp.data = user;

        revalidatePath("/admin/users");
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
