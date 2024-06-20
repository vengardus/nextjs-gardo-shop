import { getOrdesByUser } from "@/actions/order/get-orders-by-user.action";
import { OrdersTemplate } from "@/components/templates/orders/OrdersTemplate";
import { APP_CONST } from "@/config/configApp";
import { notFound } from "next/navigation";


export default async function OrdersPage() {
  

  const resp = await getOrdesByUser()
  if (!resp.success && resp.errorCode === APP_CONST.errorCode.unAuthorized) notFound()

  return (
    <OrdersTemplate orders={resp.data}/>
  )
}
