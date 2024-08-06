import Image from "next/image"
import Link from "next/link"
import { titleFont } from "@/config"

interface Props {
    message?: string
    urlLabel?: string
    urlRedirect?: string
}

export const PageNotFound = ({
    message = '',
    urlLabel='Inicio',
    urlRedirect='/'
}:Props) => {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            <div className="text-center px-5 mx-5">
                <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
                <p className="font-semibold text-xl">Whoops! Lo sentimos mucho</p>
                <p className="font-semibold text-xl">{message}</p>
                <p className="font-light">
                    <span>Puedes regresar al </span>
                    <Link href={urlRedirect}
                        className="font-bold text-lg hover:underline transition-all"
                    >
                        {urlLabel}
                    </Link>
                </p>
            </div>

            <div className="px-5 mx-5">
                <Image
                    src={'/imgs/starman_750x750.png'}
                    alt="starman"
                    width={550}
                    height={550}
                ></Image>
            </div>
        </div>
    )
}
