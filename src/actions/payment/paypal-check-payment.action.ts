"use server"

import { IResponseAction } from "@/interfaces/app/response.interface"
import prisma from "@/lib/prisma"
import { getActionError } from "@/utils/getActionError"

export const paypalCheckPayment = async(paypalTransactionId:string):Promise<IResponseAction> => {
    const resp:IResponseAction = {
        success: false
    }
    try {
        const authToken = await getPaypalBearerToken()
        if ( !authToken) throw new Error('No se pudo obtener token de verificación')

        //TODO: verifica token (pendiente usa otra api PAYPAL_ORDERS_URL)

        //TODO: si todo bien actualizar confirmacion de pago en BD
        // obtener orderId desde Paypal

        resp.success = true
        resp.data = authToken
    } catch (error) {
        resp.message = getActionError(error)
    }

    
    return resp
}

const getPaypalBearerToken = async ():Promise<string|null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL??''

    //TODO: Por ahora devuelve valor fijo
    return 'PAYPAL-TOKEN'

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64')

    // ... extraer codigo desde postman o del github del curso
    // ....
    const requestOptions = {}
    try {
        const result = await fetch(PAYPAL_OAUTH_URL, requestOptions).then(r => r.json())
        return result.access_token
    } catch (error) {
        console.log(error)
        return null
    }
} 