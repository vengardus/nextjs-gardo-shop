"use server";

import { signIn } from "@/auth";
import { IResponseAction } from "@/interfaces";
import { getActionError, initResponseAction } from "@/utils";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        // await signIn("credentials", formData);
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect: false,
        });
        return "Success";
    } catch (error) {
        if ((error as any).type === "CredentialsSignin")
            return "CredentialsSignin";
        return "UnknownError";
    }
}

export const login = async (
    email: string,
    password: string
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        resp.success = true;
    } catch (error) {
        resp.message = `No se pudo iniciar sesión: ${getActionError(error)}`;
    }

    return resp;
};
