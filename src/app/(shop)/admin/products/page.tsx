import { getValidNumber } from "@/utils";
import { PageNotFound, ProductsList } from "@/components";
import type { IProduct } from "@/interfaces";
import { getAllProductsWithImages } from "@/actions";

interface Props {
    searchParams: {
        page?: string
    }
}

export default async function ProductsPage({ searchParams }: Props) {
    const page = getValidNumber(searchParams.page)

    const resp = await getAllProductsWithImages(true, {page})

    console.log(resp.success, page)

    if (!resp.success)
        return <PageNotFound
            message={resp.message}
        />

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
