import { notFound } from "next/navigation";

import { OrdersList } from "@/components/orders/OrdersList";

import { getAllOrders } from "@/actions/order/get-all-orders.action";

import { getValidNumber } from "@/utils/getValidNumber";
import { APP_CONST } from "@/config/configApp";
import { IOrder } from "@/interfaces/order.interface";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function AdminOrdersPage({ searchParams }: Props) {
    const page = getValidNumber(searchParams.page)

    const resp = await getAllOrders(true, { page })

    if (!resp.success && resp.errorCode === APP_CONST.errorCode.unAuthorized) notFound()

    const data: IOrder[] = resp.data
    const { currentPage, totalPages } = resp.pagination

    return (
        <OrdersList 
            data={resp.data} 
            pagination={{
                totalPages: totalPages,
                currentPageServer: currentPage
            }}
        />
    )
}
