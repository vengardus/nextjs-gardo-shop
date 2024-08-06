"use server";

import prisma from "@/lib/prisma";
import { cryptoHashSync } from "@/lib";
import { getActionError, initResponseAction } from "@/utils";
import { IResponseAction } from "@/interfaces";


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
                password: cryptoHashSync(password),
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
