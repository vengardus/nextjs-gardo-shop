"use server";

import { IPaypalOrderStatusResponse } from "@/interfaces";
import { IResponseAction } from "@/interfaces/app/response.interface";
import prisma from "@/lib/prisma";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (
    paypalTransactionId: string
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    try {
        const authToken = await getPaypalBearerToken();
        if (!authToken)
            throw new Error("No se pudo obtener token de verificación");

        //TODO: verifica token (pendiente usa otra api PAYPAL_ORDERS_URL)
        const respVerify = await verifyPaypalPayment(
            paypalTransactionId,
            authToken
        );
        if (!respVerify) throw new Error("Error al verificar el pago");

        const { status, purchase_units } = respVerify;
        console.log({ status, purchase_units });
        const { invoice_id: orderId } = purchase_units[0];
        if (status !== "COMPLETED")
            throw new Error("Aún no se ha pagado en Paypal");

        //TODO: si todo bien actualizar confirmacion de pago en BD
        // obtener orderId desde Paypal
        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: new Date(),
            },
        });

        //revalidate path
        revalidatePath(`/orders/${orderId}`);

        resp.success = true;
        resp.data = orderId;
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};

const getPaypalBearerToken = async (): Promise<string | null> => {
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? "";

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        "utf-8"
    ).toString("base64");

    const headersList = {
        Accept: "*/*",
        //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Basic ${base64Token}`,
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const bodyContent = "grant_type=client_credentials";

    try {
        const response = await fetch(PAYPAL_OAUTH_URL, {
            method: "POST",
            body: bodyContent,
            headers: headersList,
            cache: "no-store",
        });
        const data = await response.json();
        console.log(data);
        return data.access_token;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const verifyPaypalPayment = async (
    paypalTransactionId: string,
    bearerToken: string
): Promise<IPaypalOrderStatusResponse | null> => {
    const PAYPAL_ORDERS_URL =
        `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}` ?? "";

    const headersList = {
        Accept: "*/*",
        //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
        Authorization: `Bearer ${bearerToken}`,
    };

    try {
        const response = await fetch(PAYPAL_ORDERS_URL, {
            method: "GET",
            headers: headersList,
            cache: "no-store",
        });
        const data: IPaypalOrderStatusResponse = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
