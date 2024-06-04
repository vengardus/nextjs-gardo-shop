"use client"

import { useEffect, useState } from "react"
import { useCartStore } from "@/store/cart/cart.store"


export const CartSumary = () => {
    const [loaded, setLoaded] = useState(false)
    const { subTotal, tax, total, totalItems } = useCartStore(state => state.getSumaryCart())

    useEffect(() => {
        setLoaded(true)
    }, [])

    if ( !loaded ) return <div>Cargando...</div>

    return (
        <div className="grid grid-cols-2 gap-5">
            <span>No Productos</span>
            <span className="text-right">{totalItems==1? '1 artículo' : `${totalItems} artículos`}</span>

            <span>SubTotal</span>
            <span className="text-right">S/. {subTotal.toFixed(2)}</span>

            <span>Impuestos (18%)</span>
            <span className="text-right">S/. {tax.toFixed(2)}</span>

            <span className="text-2xl mt-5 font-bold">Total</span>
            <span className="text-2xl mt-5 font-bold text-right">S/. {total.toFixed(2)}</span>
        </div>
    )
}
