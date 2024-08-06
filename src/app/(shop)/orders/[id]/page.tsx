import { notFound } from 'next/navigation'
import type { IOrder } from '@/interfaces'
import { getOrderById } from '@/actions'
import { OrderItems, OrderPaidMessage, OrderResumen, Title } from '@/components'

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage({ params }: Props) {
  const { id: orderId } = params

  const resp = await getOrderById(orderId)
  if (!resp.success) notFound()

  const order = resp.data as IOrder

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
