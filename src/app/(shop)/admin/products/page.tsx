import { PageNotFound } from "@/components/ui/not-found/PageNotFound";
import { ProductsList } from "@/components/admin/products/ProductsList";

import { getAllProductsWithImages } from "@/actions/product/get-all-products.action";

import { getValidNumber } from "@/utils/getValidNumber";
import { IProduct } from "@/interfaces/product.interface";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function ProductsPage({ searchParams }: Props) {
    const page = getValidNumber(searchParams.page)

    const resp = await getAllProductsWithImages(true, page)

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
