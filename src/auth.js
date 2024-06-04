import NextAuth from "next-auth";

import GitHub from "next-auth/providers/github";
//import Google from "next-auth/providers/google"
import credentials from "next-auth/providers/credentials";
import {z} from "zod"


export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        GitHub,

        credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (!parsedCredentials || !parsedCredentials.data) return null;

                const { email, password } = parsedCredentials.data;

                console.log(email, password);

                // buscar el correo

                // comparar las contraeñas

                // regresar el usuario
                return {id:'123'}
            },
        }),
    ],

    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
});
