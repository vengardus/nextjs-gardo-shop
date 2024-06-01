export const revalidate = 60  // 60 segundos

import { notFound, redirect } from "next/navigation"
import { HomeTemplate } from "@/components/templates/home/HomeTemplate"
import { isValidGender } from "@/utils/isValidGender"
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination.action"
import { getValidNumber } from "@/utils/getValidNumber"


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
  console.log('params', params)
  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender })

  //if ( id === 'kids') notFound()
  if (!products.length) redirect(`/gender/${gender}`)


  return (
    <HomeTemplate
      products={products}
      gender={gender}
      totalPages={totalPages}
    />
  )
}
