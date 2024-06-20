"use server";

import { type IProduct } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";
// import { Prisma, PrismaClient } from "@prisma/client";

// type ModelName = 'user' | 'product';

// // Crear un tipo que mapea el nombre del modelo a su tipo correspondiente
// type ModelType<K extends ModelName> = 
//   K extends 'user' ? PrismaClient['user'] :
//   K extends 'product' ? PrismaClient['product'] :
//   never;

// function getModel<K extends ModelName>(modelName: K): ModelType<K> {
//   return prisma[modelName] as ModelType<K>;
// }

// export const getAll = async (
//     modelName: ModelName,
//     orderBy: { column: string; order: "asc" | "desc" }
// ) => {
//     console.log(modelName, orderBy);
//     try {
//         const model = getModel(modelName);
//         if (modelName === 'product') {
//             const products = await (model as PrismaClient['product']).findMany();
//         }

//         if (model) {
//             const data = await model.findMany({
//                 orderBy: {
//                     title: "asc",
//                 },
//                 where: {
//                     gender: "women",
//                 },
//                 take: 3,
//             });
//             console.log(data);
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             // Aquí sabemos que `error` es una instancia de Error
//             console.error(error.message);
//         } else {
//             const message = "Ocurrió algún error";
//             console.error(`${message}:${error}`);
//         }
//     }
// };

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
            inStock: product.in_stock,
        };
    } catch (error) {
        throw new Error("Error al obtener producto por slug");
    }
    return null;
};
