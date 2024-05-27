import Link from "next/link"


export const CartCheckout = () => {
    return (
        <div className="bg-white text-black rounded-xl shadow-xl p-7 h-fit">
            <span className="text-xl font-bold">Resumen de orden</span>
            <div className="grid grid-cols-2 gap-5">
                <span>No Productos</span>
                <span className="text-right">3 artículos</span>

                <span>SubTotal</span>
                <span className="text-right">S/. 100.00</span>

                <span>Impuestos (18%)</span>
                <span className="text-right">S/. 18.00</span>

                <span className="text-2xl mt-5 font-bold">Total</span>
                <span className="text-2xl mt-5 font-bold text-right">S/. 118.00</span>
            </div>

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
