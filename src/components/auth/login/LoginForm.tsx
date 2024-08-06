"use client"

import { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoInformationCircleOutline } from "react-icons/io5";

import { authenticate } from "@/actions";
import { LoginButton } from "./LoginButton";


export const LoginForm = () => {
    // verifica si viene una ruta para direccionar luego de logear
    const redirectTo = useSearchParams().get('redirectTo') ?? null

    // Estado del Form
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (errorMessage === 'Success') {
            window.location.replace(redirectTo ?? '/')    // asegurar que se refresca el navegador.
        }
    }, [errorMessage, redirectTo])

    return (
        <form action={dispatch} className="flex flex-col">
            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                id="email"
                name="email"
            />

            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                id="password"
                name="password"
            />

            <div
                className="flex h-8 items-end space-x-1 "
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (errorMessage != 'Success') && (
                    <>
                        <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">Credenciales no son correctas</p>
                    </>
                )}
            </div>

            <LoginButton />

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


