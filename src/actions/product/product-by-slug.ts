"use server";

import { type IProduct } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

export const getProductBySlug = async (
    slug: string
): Promise<IProduct | null> => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true,
                    },
                },
            },
            where: {
                slug: slug,
            },
        });

        if (!product) return null;

        return {
            ...product,
            images: product.ProductImage.map((image) => image.url),
            inStock: product.in_stock
        };
    } catch (error) {
        throw new Error("Error al obtener producto por slug");
    }
    return null;
};
