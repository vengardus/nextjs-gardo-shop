"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cart/cart.store"
import { currencyFormat } from "@/utils/currencyFormat"
import { ProductImage } from "@/components/product/product-image/ProductImage"

export const CheckOutItems = () => {
    const glosaTitle = 'Ajustar elementos'
    const glosaLinkBack = 'Editar carrito'
    const linkBack = '/cart'
    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.cart)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded)
        return (
            <div>Cargando...</div>
        )

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
                    <div key={`${item.slug}-${item.size}`} className="flex mb-3 gap-3">
                        <ProductImage
                            src={item.image}
                            width={100}
                            height={100}
                            alt={item.title}
                            className="mr-5 rounded"
                            style={{
                                width: "100px",
                                height: "100px"
                            }}
                        />

                        <div className="w-2/3">
                            <p>{item.title}</p>
                            <p>{currencyFormat(item.price)} x {item.quantity}</p>
                            <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                            {/* <div className="underline mt-3">
                                Remover
                            </div> */}
                        </div>
                    </div>
                ))
            }
        </div >
    )
}
