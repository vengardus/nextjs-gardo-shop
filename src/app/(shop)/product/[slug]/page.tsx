export const revalidate = 604800  // 7 dias aprox

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { IProduct } from '@/interfaces'
import { getProductBySlug } from '@/actions'
import { ProductMain } from '@/components'



interface Props {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resp = await getProductBySlug(params?.slug)
    const product: IProduct = (resp.success)? resp.data : null

    return {
        title: `${product?.title}`,
        description: `${product?.description}?? ''`,
        openGraph: {
            title: `${product?.title}`,
            description: `${product?.description}?? ''`,
            images: [`/products/${product?.images[1]}`]
        }
    }
}


export default async function ProductPage({ params }: Props) {
    const { slug } = params
    const resp = await getProductBySlug(slug)

    if (!resp.data) notFound()

    const product: IProduct = resp.data


    return (
        <ProductMain
            product={product}
        />
    )
}
