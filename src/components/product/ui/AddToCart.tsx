"use client"

import { useState } from "react"
import type { ICartProduct, IProduct, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { QuantitySelector } from "../quantity-selector/QuantitySelector"
import { SizeSelector } from "../size-selector/SizeSelector"


interface Props {
    product: IProduct
}

export const AddToCart = ({ product }: Props) => {
    const addProductToCart = useCartStore(state => state.addProductToCart)
    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState(1)
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true)
        if (!size) return
        console.log({ size, quantity })
        const cartProduct: ICartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            quantity: quantity,
            price: product.price,
            size: size,
            image: product.images[0]
        }
        addProductToCart(cartProduct)

        // resetear valores
        setPosted(false)
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="mt-2 text-red-500 fade-in">
                        Debe seleccionar una talla
                    </span>
                )
            }

            {/* selector tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={(size) => setSize(size)}
            />

            {/* selector cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={(quantity) => setQuantity(quantity)}
            />

            {/* button carrito*/}
            <button
                onClick={addToCart}
                className="btn-primary my-5"
            >
                Agregar al carrito
            </button>

        </>
    )
}
