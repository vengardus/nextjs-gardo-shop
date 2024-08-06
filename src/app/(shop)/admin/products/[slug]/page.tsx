import { redirect } from "next/navigation"
import { ProductAdminMain} from "@/components"
import type { ICategory, IDataSelect, IProduct } from "@/interfaces"
import { getAllCategory, getProductBySlug } from "@/actions"


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
        <ProductAdminMain 
            slug={slug}
            data={{
                product,
                dataSelectCategories
            }}
        />
    )
}
