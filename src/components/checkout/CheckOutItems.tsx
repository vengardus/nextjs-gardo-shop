import Link from "next/link"
import Image from "next/image"
import { ISeedProduct } from "@/seed/seed"


interface Props {
    productsInCart: ISeedProduct[]
}

export const CheckOutItems = ({ productsInCart }: Props) => {
    const glosaTitle = 'Ajustar elementos'
    const glosaLinkBack = 'Editar carrito'
    const linkBack = '/cart'

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
                            <p>S/. {item.price} x 3</p>
                            <p className="font-bold">Subtotal: ${item.price * 3}</p>
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
