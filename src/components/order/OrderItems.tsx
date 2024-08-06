import Link from "next/link"
import { currencyFormat } from "@/utils"
import type { IOrderItem } from "@/interfaces"
import { ProductImage } from "../product/product-image/ProductImage"


interface Props {
    items: IOrderItem[]
}

export const OrderItems = ({ items }: Props) => {
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
                items.map(item => (
                    <div key={`${item.product.slug}-${item.size}`} className="flex mb-3 gap-3">
                        <ProductImage
                            src={item.product.ProductImage[0].url}
                            width={100}
                            height={100}
                            alt={item.product.title}
                            className="mr-5 rounded"
                            style={{
                                width: "100px",
                                height: "100px"
                            }}
                        />

                        <div className="w-2/3">
                            <p>{item.product.title}</p>
                            <p>{currencyFormat(item.price)} x {item.quantity}</p>
                            <p className="font-bold">Subtotal: ${currencyFormat(item.price * item.quantity)}</p>
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
