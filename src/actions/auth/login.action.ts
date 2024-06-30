"use server"

import { signIn } from "@/auth";
import { IResponseAction } from "@/interfaces/app/response.interface";


export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        // await signIn("credentials", formData);
        await signIn("credentials", {
            ...Object.fromEntries(formData),
            redirect:false
        } );
        return "Success"

    } catch (error) {
        if ((error as any).type === "CredentialsSignin")
            return "CredentialsSignin"
        return "UnknownError"
    }
}


export const login = async (email:string, password:string):Promise<IResponseAction> => {
    try {
        await signIn("credentials", {
            email,
            password,
            redirect:false
        } );

        return {
            success:true
        }
    } catch (error) {
        console.log('Error:', error)
        return {
            success:false,
            message:"No se pudo iniciar sesión"
        }
    }
}