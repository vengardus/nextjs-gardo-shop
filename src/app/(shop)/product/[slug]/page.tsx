export const revalidate = 604800  // 7 dias aprox


import { getProductBySlug } from '@/actions/product/product-by-slug'
import { ProductTemplate } from '@/components/templates/product/ProductTemplate'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  //const pokemon = await actionGetPokemon(params.name)
  const product = await getProductBySlug(params?.slug)
  return {
      title: `${product?.title}`,
      description: `${product?.description}?? ''`,
      openGraph: {
        title: `${product?.title}`,
        description: `${product?.description}?? ''`,
        images:[`/products/${product?.images[1]}`]
      }
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
