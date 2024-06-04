"use client"

import { authenticate } from "@/actions/auth/login.action";
import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';


export const LoginTemplate = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    console.log('state', errorMessage)

    return (
        <form action={dispatch} className="flex flex-col min-h-screen justify-center sm:h-svh ">

            <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

            <div className="flex flex-col">

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

                <button
                    type="submit"
                    className="btn-primary">
                    Ingresar
                </button>


                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>


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

            </div>
        </form>
    )
}
