"use client"

import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config"
import { useEffect, useState } from "react"


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
