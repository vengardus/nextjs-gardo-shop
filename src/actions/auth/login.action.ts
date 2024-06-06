"use server"

import { signIn } from "@/auth";


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
