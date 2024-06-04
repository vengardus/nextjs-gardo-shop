"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector"
import { ICartProduct, Size } from "@/interfaces/product.interface"
import { useCartStore } from "@/store/cart/cart.store"
import { redirect } from "next/navigation"


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

    if ( !productsInCart?.length ) redirect('/')

    if (!loaded) return <div>Cargando...</div>

    return (
        <>
            {
                productsInCart.map(item => (
                    <div key={`${item.slug}-${item.size}`} className="flex mb-3 gap-3">
                        <Image
                            src={`/products/${item.image}`}
                            width={100}
                            height={100}
                            alt={item.title}
                            className="mr-5 rounded"
                            style={{
                                width: "100px",
                                height: "100px"
                            }}
                            priority={['1742702-00-A_0_2000.jpg'].includes(item.image) ? true : false}
                        />

                        <div className="">
                            <Link
                                href={`/product/${item.slug}`}
                                className="hover:underline cursor-pointer"
                            >
                                {item.size} - {item.title}
                            </Link>
                            <p>S/. {item.price}</p>
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
