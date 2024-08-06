"use client"

import { useEffect, useState } from "react"
import { currencyFormat } from "@/utils"
import { APP_CONST } from "@/config"
import { useCartStore } from "@/store"


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
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span>Impuestos ({APP_CONST.igv}%)</span>
            <span className="text-right">{currencyFormat(tax)}</span>

            <span className="text-2xl mt-5 font-bold">Total</span>
            <span className="text-2xl mt-5 font-bold text-right">{currencyFormat(total)}</span>
        </div>
    )
}
