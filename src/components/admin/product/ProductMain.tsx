import { Title } from "@/components/ui/title/Title"
import { ProductForm } from "./ui/ProductForm"
import { IDataSelect, IProduct } from "@/interfaces"

interface Props {
    slug: string
    data: {
        product: IProduct | null,
        dataSelectCategories: IDataSelect[]
    }
}

export const ProductMain = async ({ slug, data }: Props) => {

    return (
        <>
            <Title
                title={(slug === 'new') ? 'Nuevo Producto' : "Edición de Producto"}
            />

            <ProductForm
                product={data.product}
                data={{
                    dataSelectCategories:data.dataSelectCategories
                }}
            />
        </>
    )
}
