import { labelGender } from "@/config"
import { Gender, IProduct } from "@/interfaces"
import { Title } from "../ui/title/Title"
import { Pagination } from "../ui/pagination/Pagination"
import { ProductsGrid } from "./products-grid/ProductsGrid"


interface Props {
  products: IProduct[],
  gender?: string,
  totalPages: number,
}

export const ProductList = ({ products, gender, totalPages }: Props) => {

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
