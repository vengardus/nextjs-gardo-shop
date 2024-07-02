export const revalidate = 60  // 60 segundos

import { notFound, redirect } from "next/navigation"

import { ProductList } from "@/components/products/ProductList"

import { getAllProductsWithImages } from "@/actions/product/get-all-products.action"

import { isValidGender } from "@/utils/isValidGender"
import { getValidNumber } from "@/utils/getValidNumber"
import type { IProduct } from "@/interfaces/product.interface"


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
