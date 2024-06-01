"use server"

import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug:string):Promise<number> => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug
            },
            select: {
                in_stock:true
            }
        })

        return product?.in_stock?? 0
        
    } catch (error) {
        return 0
    }
}