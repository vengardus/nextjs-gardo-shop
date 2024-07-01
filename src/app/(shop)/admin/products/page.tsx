import { PageNotFound } from "@/components/ui/not-found/PageNotFound";
import { ProductsList } from "@/components/admin/products/ProductsList";

import { getValidNumber } from "@/utils/getValidNumber";
import { getAllProducts } from "@/actions/product/get-all-products.action";
import { IProduct } from "@/interfaces/product.interface";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function ProductsPage({ searchParams }: Props) {
    const page = getValidNumber(searchParams.page)
    const resp = await getAllProducts({ page })

    if (!resp.success) 
        return <PageNotFound message={resp.message} />

    const data: IProduct[] = resp.data
    const { currentPage, totalPages } = resp.pagination

    return (
        <ProductsList
            data={data}
            pagination={{
                totalPages: totalPages,
                currentPageServer: currentPage
            }}
        />
    )
}
