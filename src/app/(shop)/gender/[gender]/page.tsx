export const revalidate = 60  // 60 segundos

import { notFound, redirect } from "next/navigation"
import { getValidNumber, isValidGender } from "@/utils"
import type { IProduct } from "@/interfaces"
import { getAllProductsWithImages } from "@/actions"
import { ProductList } from "@/components"

interface Props {
  params: {
    gender: string,
  },
  searchParams: {
    page?: string
  }
}

export default async function GenderByPage({ params, searchParams }: Props) {
  const { gender } = params
  if (!isValidGender(gender)) notFound()

  const page = getValidNumber(searchParams.page)

  const resp = await getAllProductsWithImages(true, { page }, gender )
  //if ( id === 'kids') notFound()
  if (!resp.success) redirect(`/gender/${gender}`)

  const products: IProduct[] = resp.data
  const { totalPages } = resp.pagination


  return (
    <ProductList
      products={products}
      gender={gender}
      totalPages={totalPages}
    />
  )
}
