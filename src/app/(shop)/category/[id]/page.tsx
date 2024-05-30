import { notFound } from "next/navigation"
import { getAllProductsByCategory } from "@/actions/product/product.action"
import { HomeTemplate } from "@/components/templates/home/HomeTemplate"
import { Category } from "@/seed/seed"
import { isValidCategory } from "@/libs/isCategoryValid"


interface Props {
  params: {
    id: Category
  }
}

export default async function CategoryPage({ params }: Props) {
  const { id } = params
  const products = await getAllProductsByCategory(id)

  //if ( id === 'kids') notFound()
  if (!isValidCategory(id)) notFound()

  return (
    <HomeTemplate
      products={products}
      category={id}
    />
  )
}
