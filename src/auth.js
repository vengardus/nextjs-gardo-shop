import NextAuth, { CredentialsSignin } from "next-auth";

import GitHub from "next-auth/providers/github";
//import Google from "next-auth/providers/google"
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import prisma from "./lib/prisma";


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
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user) return null;

                // comparar las contraeñas
                if (!bcryptjs.compareSync(password, user.password)) return null;

                // regresar el usuario (sin el password)
                const {password:_, ...rest} = user
                console.log('user:', rest)
                return rest;
            },
        }),
    ],

    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
});
