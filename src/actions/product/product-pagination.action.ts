"use server";

import { IProduct } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface IPaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({
    page=1,
    take=10,
}: IPaginationOptions): Promise<{
    products: IProduct[];
}> => {
    if (page < 1) page = 1;

    const productsDB = await prisma.product.findMany({
        take: take,
        skip: (page - 1) * take,
        include: {
            ProductImage: {
                take: 2,
                select: {
                    url: true,
                },
            },
        },
    });

    const products = {
        products: productsDB.map((product) => ({
            ...product,
            images: product.ProductImage.map((image) => image.url),
            inStock: product.in_stock,
        })),
    };

    return products;
};
