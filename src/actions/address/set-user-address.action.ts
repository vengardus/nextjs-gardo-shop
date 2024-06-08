"use server";

import type { IAddress } from "@/interfaces/address.interface";
import type { IResponseAction } from "@/interfaces/response.interface";
import prisma from "@/lib/prisma";

export const setUserAddress = async (
    address: IAddress,
    user_id: string
): Promise<IResponseAction> => {
    try {
        let newUserAddreess;
        const { country, ...restAddress } = address;

        
        const addressToSave = {
            ...restAddress,
            country_id: address.country,
            user_id,
        };
        
        if (!(await prisma.userAddress.findUnique({ where: { user_id } }))) {
            // direccion no existe
            console.log('SET', user_id, restAddress, country, addressToSave)
            newUserAddreess = await prisma.userAddress.create({
                data: addressToSave,
            });
        } else {
            // direccion ya existe
            newUserAddreess = await prisma.userAddress.update({
                where: { user_id },
                data: addressToSave,
            });
        }

        return {
            success: true,
            data: newUserAddreess,
        };
    } catch (error) {
        console.error("No se pudo grabar la dirección ", error);

        return {
            success: false,
            message: "No se pudo grabar la dirección ",
        };
    }
};
