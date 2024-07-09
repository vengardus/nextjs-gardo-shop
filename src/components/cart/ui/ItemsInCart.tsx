"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { ICartProduct, Size } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart.store"
import { redirect } from "next/navigation"
import { currencyFormat } from "@/utils/currencyFormat"
import { ProductImage } from "@/components/product/product-image/ProductImage"


export const ItemsInCart = () => {
    const productsInCart = useCartStore(state => state.cart)
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProduct = useCartStore(state => state.removeProduct)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    const onQuantityChanged = (item: ICartProduct, quantity: number) => {
        updateProductQuantity(item, quantity)
    }

    const onRemoveProduct = (id: string, size: Size) => {
        removeProduct(id, size)
    }

    if ( loaded && !productsInCart?.length ) redirect('/empty')

    if (!loaded) return <div>Cargando...</div>

    return (
        <>
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

                        <div className="">
                            <Link
                                href={`/product/${item.slug}`}
                                className="hover:underline cursor-pointer"
                            >
                                {item.size} - {item.title}
                            </Link>
                            <p>{currencyFormat(item.price)}</p>
                            <QuantitySelector
                                quantity={item.quantity}
                                onQuantityChanged={(quantity) => onQuantityChanged(item, quantity)}
                            />
                            <div
                                className="underline mt-3 hover:underline cursor-pointer"
                                onClick={() => onRemoveProduct(item.id, item.size)}
                            >
                                Remover
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
