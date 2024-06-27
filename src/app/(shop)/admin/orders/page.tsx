import { notFound } from "next/navigation";
import { OrdersTemplate } from "@/components/templates/admin/orders/OrdersTemplate";
import { APP_CONST } from "@/config/configApp";
import { getAllOrdes } from "@/actions/order/get-all-orders.action";


export default async function OrdersPage() {
    const resp = await getAllOrdes()
    console.log(resp.data)
    if (!resp.success && resp.errorCode === APP_CONST.errorCode.unAuthorized) notFound()

    return (
        <OrdersTemplate orders={resp.data} />
    )
}
