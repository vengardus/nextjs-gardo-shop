import Link from "next/link"


export const CheckOutResumen = () => {
    return (
        <div className="bg-gray-300 text-black rounded-xl shadow-xl p-7">
            <span className="text-xl font-bold">Dirección de entrega</span>
            <div className="flex flex-col mt-3">
                <span className="font-bold">Gardus Raminsky</span>
                <span>Calle la Esperanza 369</span>
                <span>2 cdras Ovalo</span>
                <span>Antioquia</span>
                <span>Lima</span>
                <span>C.P 369369</span>
                <span>051-999666333</span>
            </div>

            <hr className="w-full h-0.5 bg-gray-700 my-7 rounded-md"></hr>

            <span className="text-xl font-bold">Resumen de orden</span>
            <div className="grid grid-cols-2 gap-1">
                <span>No Productos</span>
                <span className="text-right">3 artículos</span>

                <span>SubTotal</span>
                <span className="text-right">S/. 100.00</span>

                <span>Impuestos (18%)</span>
                <span className="text-right">S/. 18.00</span>

                <span className="text-2xl mt-5 font-bold">Total</span>
                <span className="text-2xl mt-5 font-bold text-right">S/. 118.00</span>
            </div>

            <p className="mb-5 mt-2">
                {/* Disclaimer */ }
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
