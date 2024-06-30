"use server";

import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
    name: string,
    email: string,
    password: string
):Promise<IResponseAction> => {
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

        return {
            success: true,
            data: user
        }

    } catch (error) {
        console.log(error);

        return {
            success: false,
            message: "No se pudo crear el usuario.",
        };
    }
};
