"use server";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";
import bcryptjs from "bcryptjs";

export const registerUser = async (
    name: string,
    email: string,
    password: string
):Promise<IResponseAction> => {
    const resp = initResponseAction()

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
            },
            select: {
                id:true,
                name:true,
                email:true
            }
        });

        resp.success = true,
        resp.data = user

    } catch (error) {
        //console.log(error);

        resp.message = `No se pudo crear el usuario: ${getActionError(error)}}`
    }

    return resp
};
