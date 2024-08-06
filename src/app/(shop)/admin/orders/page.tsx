import { notFound } from "next/navigation";


import { APP_CONST } from "@/config";
import { getValidNumber } from "@/utils";
import { IOrder } from "@/interfaces";
import { getAllOrders } from "@/actions";
import { OrdersList } from "@/components";


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
