import { getProductBySlug } from '@/actions/products/products.action'
import { ProductTemplate } from '@/components/templates/product/ProductTemplate'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}


export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <ProductTemplate
      product={product}
    />
  )
}
