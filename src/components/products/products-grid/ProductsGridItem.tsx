"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { IProduct } from "@/interfaces/product.interface"
import { currencyFormat } from "@/utils/currencyFormat"
import { ProductImage } from "@/components/product/product-image/ProductImage"
import { APP_CONST, dataApp } from "@/config/configApp"

interface Props {
    product: IProduct
}

export const ProductsGridItem = ({ product }: Props) => {
    const [displayImage, setDisplayImage] = useState(product.images[0])

    return (
        <div className="rounded-md overflow-hidden fade-in">
            <Link
                href={`/product/${product.slug}`}
                className="hover:text-blue-500"
            >
                <ProductImage
                    src={displayImage}
                    alt={product.title}
                    className="w-full object-cover rounded"
                    width={550}
                    height={550}
                    // Todo: priority={true}
                    priority={dataApp.imagesLCPToPriority.some(image => displayImage.includes(image)) ? true : false}
                    onMouseEnter={() => {
                        if (product.images[1])
                            setDisplayImage(product.images[1])
                    }}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />

                <div className="p-4 flex flex-col">
                    {product.title}-{displayImage}
                    <span className="font-bold">{currencyFormat(product.price)}</span>
                </div>
            </Link>
        </div>
    )
}
