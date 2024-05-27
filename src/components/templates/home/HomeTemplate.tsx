import { Product } from "@/interfaces/product.interface"
import { ProductsGrid } from "@/components/products/products-grid/ProductsGrid"
import { Title } from "@/components/ui/title/Title"
import { Category } from "@/seed/seed"
import { labelCategory } from "@/config/configApp"

interface Props {
  products: Product[],
  category?: Category
}

export const HomeTemplate = ({ products, category }: Props) => {

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
    </>
  )
}
