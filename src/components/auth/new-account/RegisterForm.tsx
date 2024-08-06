"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import clsx from "clsx"
import { login, registerUser } from "@/actions"

type FormInputs = {
    name: string,
    email: string,
    password: string
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

    const onSubmit = async (data: FormInputs) => {
        const { name, email, password } = data
        console.log(data)

        // server action
        setErrorMessage('')
        const resp = await registerUser(name, email, password)

        if (!resp.success) {
            setErrorMessage(resp.message!)
            return
        }

        const respLogin = await login(email, password)
        if (!respLogin.success) {
            setErrorMessage(respLogin.message!)
            return 
        }

        window.location.replace('/')
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
        >
            <label htmlFor="name">Nombre completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/ })}
            />


            <label htmlFor="password">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            "border-red-500": errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            <span className="text-red-500 flex justify-center mb-3">{errorMessage}</span>

            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
