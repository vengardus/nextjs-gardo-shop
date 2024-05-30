"use server";

import { IProduct } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface IPaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 10,
}: IPaginationOptions): Promise<{
    products: IProduct[];
    currentPage: number;
    totalPages: number;
}> => {
    // 1. Validar page y take
    if (page < 1) page = 1;

    // 2. Obtener productos
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

    // 3. mapper prodctosDB a tipo IProduct[]
    const products = productsDB.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
        inStock: product.in_stock,
    }));

    // 4. Obtener datos de paginación
    const productCount = await prisma.product.count({});
    const totalPages = Math.ceil(productCount / take);

    return {
        products,
        currentPage: page,
        totalPages,
    };
};
