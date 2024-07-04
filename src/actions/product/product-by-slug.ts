"use server";

import prisma from "@/lib/prisma";
import { IResponseAction } from "@/interfaces/app/response.interface";
import { initResponseAction } from "@/utils/initResponseAction";
import { getActionError } from "@/utils/getActionError";

export const getProductBySlug = async (
    slug: string
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    try {
        const product = await prisma.product.findFirst({
            include: {
                ProductImage: {
                    select: {
                        url: true,
                        id: true,
                    },
                },
            },
            where: {
                slug: slug,
            },
        });

        if (!product) resp.data = product;
        else {
            // mapper
            const productTOIProduct = {
                ...product,
                images: product.ProductImage.map((image) => image.url),
                inStock: product.in_stock,
            };
            resp.data = productTOIProduct;
        }
        resp.success = true;
    } catch (error) {
        resp.message = getActionError(error);
    }
    return resp;
};
