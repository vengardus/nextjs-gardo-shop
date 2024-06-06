import { titleFont } from "@/config/fonts"
import Link from "next/link"
import { RegisterForm } from "./ui/RegisterForm"


export const NewAccountTemplate = () => {
    return (
        <div className="flex flex-col min-h-screen justify-center sm:h-svh ">

            <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva cuenta</h1>

            <RegisterForm />
        </div>
    )
}
