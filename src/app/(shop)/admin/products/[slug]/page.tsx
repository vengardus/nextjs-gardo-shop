import { getAllCategory } from "@/actions/category/get-all-category"
import { getProductBySlug } from "@/actions/product/product-by-slug"
import { ProductMain } from "@/components/admin/product/ProductMain"
import { IDataSelect } from "@/interfaces/app/data-select.interface"
import { ICategory } from "@/interfaces/category.interface"
import { IProduct } from "@/interfaces/product.interface"
import { redirect } from "next/navigation"

interface Props {
    params: {
        slug: string
    }
}

export default async function AdminProductPage({ params }: Props) {

    const {slug} = params
    
    const [respCategory, respProduct] = await Promise.all([
        getAllCategory(),
        getProductBySlug(slug)
    ])

    const categories:ICategory[] = respCategory.data?? []
    const dataSelectCategories:IDataSelect[] = categories.map(item => (
        {
            value: item.id,
            label: item.name
        }
    ))

    if ( !respProduct.success || (!respProduct.data && slug != 'new'))
        redirect('/admin/products')

    const product = (respProduct.data)? respProduct.data as IProduct : null


    return (
        <ProductMain 
            slug={slug}
            data={{
                product,
                dataSelectCategories
            }}
        />
    )
}
