import { getOrderById } from '@/actions/order/get-order-by-id.action'
import { OrderTemplate } from '@/components/templates/order/OrderTemplate'
import { IOrder } from '@/interfaces/order.interface'
import { notFound} from 'next/navigation'

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
        <OrderTemplate order={order} />
    )
}
