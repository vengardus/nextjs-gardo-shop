"use server";

import type { IAddress } from "@/interfaces/address.interface";
import type { IResponseAction } from "@/interfaces/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";

export const setUserAddress = async (
    address: IAddress,
    user_id: string
): Promise<IResponseAction> => {
    try {
        let newUserAddress;
        const { country, ...restAddress } = address;

        const addressToSave = {
            ...restAddress,
            country_id: address.country,
            user_id,
        };

        const userAddress = await prisma.userAddress.findUnique({
            where: { user_id },
        });
        if (!userAddress) {
            // direccion no existe
            newUserAddress = await prisma.userAddress.create({
                data: addressToSave,
            });
        } else {
            // direccion ya existe
            newUserAddress = await prisma.userAddress.update({
                where: { id: userAddress.id },
                data: {
                    firstName: addressToSave.firstName,
                    lastName: addressToSave.address2,
                    address: addressToSave.address,
                    address2: addressToSave.address2,
                    country_id: addressToSave.country_id,
                    city: addressToSave.city,
                    postalCode: addressToSave.postalCode,
                    phone: addressToSave.phone,
                },
            });
        }

        return {
            success: true,
            data: newUserAddress,
        };
    } catch (error) {
        const message = getActionError(error);

        return {
            success: false,
            message,
        };
    }
};
