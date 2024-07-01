"use server";

import prisma from "@/lib/prisma";

import { APP_CONST } from "@/config/configApp";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";
import { ProductMapper } from "@/mapper/product.mapper";
import type { IResponseAction } from "@/interfaces/app/response.interface";
import type { IPagination } from "@/interfaces/app/pagination.interface";
import type { Gender } from "@/interfaces/product.interface";

export const getAllProductsWithImages = async (
    applyPagination: boolean = false,
    pagination?: IPagination,
    gender?: string
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    // 0. Obtener datos de pagination o default
    let page, take, skip;
    if (!applyPagination) {
        take = undefined;
        skip = 0;
        page = 1;
    } else {
        page = pagination?.page ?? 1;
        take = pagination?.take ?? APP_CONST.pagination.take;
        skip = (page - 1) * take;
    }

    // 1. Validar page y take
    if (page < 1) page = 1;

    try {
        // 2. Obtener productos
        const productsDB = await prisma.product.findMany({
            take,
            skip,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    },
                },
            },
            where: {
                ...(gender
                    ? {
                          gender: gender as Gender,
                      }
                    : {}),
            },
        });

        // 3. Obtener datos de paginación
        if (applyPagination) {
            const productCount = await prisma.product.count({
                where: {
                    ...(gender
                        ? {
                              gender: gender as Gender,
                          }
                        : {}),
                },
            });
            const totalPages = Math.ceil(productCount / take!);

            resp.pagination = {
                currentPage: page,
                totalPages: totalPages!,
            };
        }

        // 4. Mapper prodctosDB a IProduct[]
        const products = ProductMapper.IProductFromPrismaProduct(productsDB);

        resp.success = true;
        resp.data = products;
        
    } catch (error) {
        resp.message = getActionError("No se pudo cargar los productos");
    }

    return resp;
};
