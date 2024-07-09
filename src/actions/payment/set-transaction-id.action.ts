"use server"

import { IResponseAction } from "@/interfaces/app/response.interface"
import prisma from "@/lib/prisma"
import { getActionError } from "@/utils/getActionError"
import { initResponseAction } from "@/utils/initResponseAction"


export const setTransactionId = async(transactionId:string, orderId:string):Promise<IResponseAction> => {
    const resp = initResponseAction()

    try {
        const order = await prisma.order.update({
            where: { id: orderId},
            data:{
                transactionId:transactionId
            }
        })
        if ( ! order ) throw new Error(`No se encontró orden pára actualizar: ${orderId}`)
        resp.success = true
        resp.data = order
    } catch (error) {
        resp.message = getActionError(error)
    }

    return resp

}