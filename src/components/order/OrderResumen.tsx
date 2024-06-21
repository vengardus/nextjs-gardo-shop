import type { IOrder } from "@/interfaces/order.interface"
import { OrderMapper } from "@/mapper/order.mapper"
import { currencyFormat } from "@/utils/currencyFormat"
import { APP_CONST } from "@/config/configApp"
import { PaypalButton } from "../paypal/PaypalButton"

interface Props {
    order: IOrder
}

export const OrderResumen = ({ order }: Props) => {
    const address = OrderMapper.OrderAddress(order.OrderAddress)

    return (
        <div className="bg-white text-black rounded-xl shadow-xl p-7">
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
                <span className="text-right">{order.itemsInOrder} {order.itemsInOrder > 1 ? 'artículos' : 'artículo'}</span>

                <span>SubTotal</span>
                <span className="text-right">{currencyFormat(order.subTotal)}</span>

                <span>Impuestos ({APP_CONST.igv}%)</span>
                <span className="text-right">{currencyFormat(order.tax)}</span>

                <span className="text-2xl mt-5 font-bold">Total</span>
                <span className="text-2xl mt-5 font-bold text-right">{currencyFormat(order.total)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
                {/* <OrderPaidMessage isPaid={order.isPaid} /> */}
                <PaypalButton />
            </div>
        </div>
    )
}
