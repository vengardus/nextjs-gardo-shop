export const revalidate = 60    // 60 segundos

import { redirect } from "next/navigation";

import { HomeTemplate } from "@/components/templates/home/HomeTemplate";


import { getValidNumber } from "@/utils/getValidNumber";
import type { IProduct } from "@/interfaces/product.interface";
import { getAllProductsWithImages } from "@/actions/product/get-all-products.action";


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
        <HomeTemplate
            products={products}
            totalPages={totalPages}
        />
    );
}
