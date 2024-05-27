"use client"
import { useState } from "react"
import { Product } from "@/interfaces/product.interface"
import Image from "next/image"
import Link from "next/link"

interface Props {
    product: Product
}

export const ProductsGridItem = ({ product }: Props) => {
    const [displayImage, setDisplayImage] = useState(product.images[0])

    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link
                href={`/product/${product.slug}`}
                className="hover:text-blue-500"
            >
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover rounded"
                    width={550}
                    height={550}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />

                <div className="p-4 flex flex-col">
                    {product.title}
                    <span className="font-bold">{product.price}</span>
                </div>
            </Link>
        </div>
    )
}
