"use server";

import prisma from "@/lib/prisma";
import { isUserAdmin } from "../auth/is-user-admin.action";
import { getActionError } from "@/utils/getActionError";
import { initResponseAction } from "@/utils/initResponseAction";
import { APP_CONST } from "@/config/configApp";
import { IResponseAction } from "@/interfaces/app/response.interface";
import { ProductMapper } from "@/mapper/product.mapper";

interface IPaginationOptions {
    page?: number;
    take?: number;
}

export const getAllProducts = async ({
    page = 1,
    take = APP_CONST.pagination.take,
}: IPaginationOptions): Promise<IResponseAction> => {
    const resp = initResponseAction();

    // PAGINACION: Validar page y take
    if (page < 1) page = 1;

    try {
        const respAuth = await isUserAdmin(resp);
        if (!respAuth.success) throw new Error(respAuth.resp.message);

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
            orderBy: {
                title: "asc",
            },
        });

        // 3. mapper prodctosDB a tipo IProduct[]
        const products = ProductMapper.IProductFromPrismaProduct(productsDB)

        // PAGINACION: Obtener número de paginas
        const count = await prisma.product.count();
        const totalPages = Math.ceil(count / take);
        
        // Definir respuesta
        resp.success = true;
        resp.data = products,
        resp.pagination!.currentPage = page,
        resp.pagination!.totalPages = totalPages

    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
