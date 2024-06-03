"use client"

import { IProduct, Size } from "@/interfaces/product.interface"
import { QuantitySelector } from "../quantity-selector/QuantitySelector"
import { SizeSelector } from "../size-selector/SizeSelector"
import { useState } from "react"

interface Props {
    product: IProduct
}

export const AddToCart = ({ product }: Props) => {
    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState(1)
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true)
        if (!size) return
        console.log({ size, quantity })
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
