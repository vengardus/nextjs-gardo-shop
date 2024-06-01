import { type IProduct } from "@/interfaces/product.interface"
import { ProductsGrid } from "@/components/products/products-grid/ProductsGrid"
import { Title } from "@/components/ui/title/Title"
import { Pagination } from "@/components/ui/pagination/Pagination"
import { Gender } from "@prisma/client"
import { labelGender } from "@/config/configApp"

interface Props {
  products: IProduct[],
  gender?: string,
  totalPages: number
}

export const HomeTemplate = ({ products, gender, totalPages }: Props) => {

  return (
    <>
      <Title
        title={`${(gender === undefined) ? 'Tienda' : `Artículos para ${labelGender[gender as Gender]}`}`}
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
