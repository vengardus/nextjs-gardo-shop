import { Title } from "../../ui/title/Title"
import { OrderItems } from "../../order/OrderItems"
import { OrderResumen } from "../../order/OrderResumen"
import type { IOrder } from "@/interfaces/order.interface"
import { OrderPaidMessage } from "@/components/order/OrderPaidMessage"

interface Props {
    order: IOrder
}


export const OrderTemplate = async ({ order }: Props) => {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px] bg-red-3001">

                <Title title={`Orden #${order.id.split('-').at(-1)}`} />

                <OrderPaidMessage isPaid={order.isPaid} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Items en el carrito */}
                    <OrderItems items={order.OrderItem} />

                    {/* Checkout - resumen de compra*/}
                    <OrderResumen order={order} />

                </div>

            </div>
        </div>
    )
}
