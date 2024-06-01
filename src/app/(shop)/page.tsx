import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination.action";
import { HomeTemplate } from "@/components/templates/home/HomeTemplate";
import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";


//const products = initialData.products.slice(0)
interface Props {
    searchParams: {
        page?: string
    }
}

export default async function HomePage({ searchParams }: Props) {
    const page = isNaN(Number(searchParams.page)) ? 1 : Number(searchParams.page)
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page })

    console.log(currentPage, totalPages)

    if (!products.length) redirect('/')

    return (
        <HomeTemplate
            products={products}
            totalPages={totalPages}
        />
    );
}
