import Link from "next/link"
import { CartSumary } from "./ui/CartSumary"


export const CartCheckout = () => {
    return (
        <div className="bg-white text-black rounded-xl shadow-xl p-7 h-fit">
            <span className="text-xl font-bold">Resumen de orden</span>
            
            <CartSumary />

            <div className="flex mt-5 mb-2">
                <Link
                    href={'/checkout/address'}
                    className="flex btn-primary justify-center w-full text-xl">
                    Checkout
                </Link>
            </div>
        </div>
    )
}
