import { ISeedProduct, initialData } from "@/seed/seed"
import { Title } from "../../ui/title/Title"
import { OrderItems } from "../../order/OrderItems"
import { OrderResumen } from "../../order/OrderResumen"
import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

interface Props {
    id: string
}

const products: ISeedProduct[] = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2]
]

export default function OrderTemplate({ id }: Props) {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] bg-red-3001">

                <Title title={`Orden #${id}`} />

                <div className={
                    clsx(
                        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                        {
                            'bg-red-500': false,
                            'bg-green-700': true,
                        }
                    )
                }>
                    <IoCardOutline size={30} />
                    {/* <span className="mx-2">Pendiente de pago</span> */}
                    <span className="mx-2">Pagada</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Items en el carrito */}
                    <OrderItems productsInCart={products} />

                    {/* Checkout - resumen de compra*/}
                    <OrderResumen />

                </div>

            </div>
        </div>
    )
}
