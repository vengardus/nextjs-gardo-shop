"use client"

import { useEffect, useState } from "react"
import { titleFont } from "@/config/fonts"
import { getStockBySlug } from "@/actions/product/get-stock-by-slug"


interface Props {
    slug: string
}

export const StockLabel = ({ slug }: Props) => {
    const [stock, setStock] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStock = async () => {
            const inStock = await getStockBySlug(slug)
            setStock(inStock)
            setIsLoading(false)
        }
        fetchStock()
    }, [slug])


    return (
        <>
            {
                isLoading
                    ? (
                        <h1 className={`${titleFont.className} antialiased font-bold text-xl animate-pulse bg-gray-200 fade-in`}>
                            &nbsp;
                        </h1>
                    )
                    : (
                        <h1 className={`${titleFont.className} antialiased font-bold text-xl fade-in`}>
                            Stock: {stock}
                        </h1>
                    )
            }
        </>
    )
}
