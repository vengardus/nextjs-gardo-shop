export const revalidate = 60    // 60 segundos

import { redirect } from "next/navigation";

import { ProductList } from "@/components/products/ProductList";

import { getAllProductsWithImages } from "@/actions/product/get-all-products.action";

import { getValidNumber } from "@/utils/getValidNumber";
import type { IProduct } from "@/interfaces/product.interface";


//const products = initialData.products.slice(0)
interface Props {
    searchParams: {
        page?: string
    }
}

export default async function HomePage({ searchParams }: Props) {
    //const page = isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page)
    const page = getValidNumber(searchParams.page)

    const resp = await getAllProductsWithImages(true, { page })

    if (!resp.success) redirect('/')

    const products: IProduct[] = resp.data
    const { currentPage, totalPages } = resp.pagination


    return (
        <ProductList
            products={products}
            totalPages={totalPages}
        />
    );
}
