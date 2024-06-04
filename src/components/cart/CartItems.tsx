import Link from "next/link"
import { ISeedProduct } from "@/seed/seed"


interface Props {
    productsInCart: ISeedProduct[]
    isCheckOut?: boolean
}

export const CartItems = ({ productsInCart, isCheckOut = false }: Props) => {
    const glosaTitle = 'Agregar mas items'
    const glosaLinkBack = 'Continuar comprando'
    const linkBack = '/'

    return (
        <div className="flex flex-col" >
            <span className="text-xl">
                {glosaTitle}
            </span>
            <Link href={linkBack} className="hover:underline mb-5">
                {glosaLinkBack}
            </Link>

            
        </div >
    )
}
