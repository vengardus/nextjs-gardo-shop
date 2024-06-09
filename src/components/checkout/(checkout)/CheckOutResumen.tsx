"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAddressStore } from "@/store/address/address.store"
import { useCartStore } from "@/store/cart/cart.store"
import { currencyFormat } from "@/utils/currencyFormat"


export const CheckOutResumen = () => {
    const [loaded, setLoaded] = useState(false)
    const addres = useAddressStore(state => state.address)
    const { totalItems, subTotal, tax, total } = useCartStore(state => state.getSumaryCart())

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded)
        return (
            <div>Cargando...</div>
        )

    return (
        <div className="bg-gray-300 text-black rounded-xl shadow-xl p-7">
            <span className="text-xl font-bold">Dirección de entrega</span>
            <div className="flex flex-col mt-3">
                <span className="font-bold">{addres.firstName} {addres.lastName}</span>
                <span>{addres.address}</span>
                <span>{addres.address2}</span>
                <span>{addres.city}</span>
                <span>{addres.country}</span>
                <span>{addres.postalCode}</span>
                <span>{addres.phone}</span>
            </div>

            <hr className="w-full h-0.5 bg-gray-700 my-7 rounded-md"></hr>

            <span className="text-xl font-bold">Resumen de orden</span>
            <div className="grid grid-cols-2 gap-1">
                <span>No Productos</span>
                <span className="text-right">{totalItems} {totalItems > 1 ? 'artículos' : 'artículo'}</span>

                <span>SubTotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (18%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="text-2xl mt-5 font-bold">Total</span>
                <span className="text-2xl mt-5 font-bold text-right">{currencyFormat(total)}</span>
            </div>

            <p className="mb-5 mt-2">
                {/* Disclaimer */}
                <span className="text-xs">
                    Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                </span>
            </p>

            <div className="flex mt-5 mb-2">
                <Link
                    href={'/orders/123'}
                    className="flex btn-primary justify-center w-full text-xl">
                    Colocar orden
                </Link>
            </div>
        </div>
    )
}
