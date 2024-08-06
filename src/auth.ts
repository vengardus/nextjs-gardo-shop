import NextAuth, { CredentialsSignin } from "next-auth";

import GitHub from "next-auth/providers/github";
//import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import { cryptoCompareSync } from "./lib";


export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        GitHub,

        Credentials({
            async authorize(credentials) {
                try {
                    const parsedCredentials = z
                        .object({
                            email: z.string().email(),
                            password: z.string().min(6),
                        })
                        .safeParse(credentials);

                    if (!parsedCredentials || !parsedCredentials.data)
                        return null;

                    const { email, password } = parsedCredentials.data;

                    console.log(email, password);

                    // buscar el correo
                    const user = await prisma.user.findUnique({
                        where: { email: email.toLowerCase() },
                    });
                    if (!user) return null;

                    // comparar las contraeñas
                    if (!cryptoCompareSync(password, user.password))
                        return null;

                    // regresar el usuario (sin el password)
                    const { password: _, ...rest } = user;
                    console.log("user:!!!", rest);
                    return rest;
                } catch (error) {
                    console.log("CATCH, usuario o pass incorectos");
                    throw Error("Usuario o passowrd incorrecto");
                }
            },
        }),
    ],

    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log("AUTH", auth);
            // const isLoggedIn = !!auth?.user;
            // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
            // if (isOnDashboard) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL("/dashboard", nextUrl));
            // }
            return true;
        },

        async signIn({ user, account, profile, email, credentials }) {
            // user: User | UserAdapter
            //  En este punto el usuario fue autenticado, pero si signIn regresa false, se niega el acceso. Por ejemplo ouede usarse para validar usuarios de un dominio especifico.
            console.log("signIN!!!");
            return true;
        },

        async jwt({ token, user, account, profile }) {
            console.log("JWT!!!");
            if (user) token.data = user;

            return token;
        },

        async session({ session, token, user }) {
            console.log("session!!!");
            session.user = token.data as any;

            return session;
        },
    },
});
