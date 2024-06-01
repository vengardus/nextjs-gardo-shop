import { type IProduct } from "@/interfaces/product.interface"
import { ProductsGrid } from "@/components/products/products-grid/ProductsGrid"
import { Title } from "@/components/ui/title/Title"
import { Category } from "@/seed/seed"
import { labelCategory } from "@/config/configApp"
import { Pagination } from "@/components/ui/pagination/Pagination"

interface Props {
  products: IProduct[],
  category?: Category,
  totalPages: number
}

export const HomeTemplate = ({ products, category, totalPages }: Props) => {

  return (
    <>
      <Title
        title={`${(category === undefined) ? 'Tienda' : `Artículos para ${labelCategory[category]}`}`}
        subTitle={`Todos los productos`}
        className="mb-2"
      />

      <ProductsGrid
        products={products}
      />

      <Pagination totalPages={totalPages}/>
    </>
  )
}
