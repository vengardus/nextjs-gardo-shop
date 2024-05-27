import Link from "next/link"
import Image from "next/image"
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
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

            {
                productsInCart.map(item => (
                    <div key={item.slug} className="flex mb-3 gap-3">
                        <Image
                            src={`/products/${item.images[0]}`}
                            width={100}
                            height={100}
                            alt={item.title}
                            className="mr-5 rounded"
                            style={{
                                width: "100px",
                                height: "100px"
                            }}
                        />

                        <div className="">
                            <p>{item.title}</p>
                            <p>S/. {item.price}</p>
                            <QuantitySelector quantity={3} />
                            <div className="underline mt-3">
                                Remover
                            </div>
                        </div>
                    </div>
                ))
            }
        </div >
    )
}
