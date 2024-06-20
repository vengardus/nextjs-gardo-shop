"use server";

import { auth } from "@/auth";
import { APP_CONST } from "@/config/configApp";
import { IResponseAction } from "@/interfaces/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";

export const getOrderById = async (
    orderId: string
): Promise<IResponseAction> => {
    const resp: IResponseAction = {
        success: false,
    };
    
    try {
        const session = await auth()

        if ( !session ) throw new Error('Usuario no autenticado.')

        // 1. Obtener orden (con los items relacionados y su dirección de entrega)
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        quantity:true,
                        price:true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug:true,
                                ProductImage: {
                                    select :{
                                        url: true
                                    },
                                    take: 1
                                }
                            },
                        },
                    },
                },
            },
        });
        
        // validar orden y se tenga acceso
        if (!order) throw new Error(`No se encontró orden ${orderId}`);
        if ( session?.user.role == APP_CONST.userRole.user ) {
            if ( order.user_id !== session.user.id)
                throw new Error(`Orden ${order.id} no es del usuario ${session.user.id}`)
        }
        
        resp.success = true;
        resp.data = order
         
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
