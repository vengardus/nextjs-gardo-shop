"use client"

import { useEffect, useState } from "react"
import clsx from "clsx"
import { useAddressStore } from "@/store/address/address.store"
import { useCartStore } from "@/store/cart/cart.store"
import { currencyFormat } from "@/utils/currencyFormat"
import { type IProductToOrder, placeOrder } from "@/actions/order/pace-order.action"


export const CheckOutResumen = () => {
    const [loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)
    const address= useAddressStore(state => state.address)
    const { totalItems, subTotal, tax, total } = useCartStore(state => state.getSumaryCart())
    const cart = useCartStore(state => state.cart)

    useEffect(() => {
        setLoaded(true)
    }, [])


    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)

        const productsToOrder:IProductToOrder[] = cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            size: item.size
        }))
        const addressToOrder = {
            ...address,
            address2:address.address2?? ''
        }
        const resp = await placeOrder(productsToOrder, addressToOrder)
        console.log('placeOrder', resp)

        setIsPlacingOrder(false)
    }


    if (!loaded)
        return (
            <div>Cargando...</div>
        )

    return (
        <div className="bg-gray-300 text-black rounded-xl shadow-xl p-7">
            <span className="text-xl font-bold">Dirección de entrega</span>
            <div className="flex flex-col mt-3">
                <span className="font-bold">{address.firstName} {address.lastName}</span>
                <span>{address.address}</span>
                <span>{address.address2}</span>
                <span>{address.city}</span>
                <span>{address.country}</span>
                <span>{address.postalCode}</span>
                <span>{address.phone}</span>
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
                <button
                    //href={'/orders/123'}
                    onClick={onPlaceOrder}
                    className={clsx(
                        {
                            "btn-primary" : !isPlacingOrder,
                            "btn-disabled": isPlacingOrder
                        }
                    )}
                >
                    Colocar orden
                </button>
            </div>
        </div>
    )
}
