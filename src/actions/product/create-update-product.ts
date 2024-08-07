"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prisma";
import { enumGender } from "@/config/configApp";
import { initResponseAction } from "@/utils/initResponseAction";
import { getActionError } from "@/utils/getActionError";
import { IResponseAction } from "@/interfaces/app/response.interface";
import { IProduct, IProductImage, Size } from "@/interfaces/product.interface";

// Configuration Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    // price viene como string pero debe validarse como number: metodo coerce
    price: z.coerce
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(2))),
    inStock: z.coerce
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(0))),
    categoryId: z.string().uuid(),
    sizes: z.coerce.string().transform((val) => val.split(",")),
    tags: z.string(),
    gender: z.nativeEnum(enumGender),
});

export const createUpdateProduct = async (
    formData: FormData
): Promise<IResponseAction> => {
    const resp = initResponseAction();

    try {
        // 0. Validar formData
        const data = Object.fromEntries(formData);
        const productParsed = productSchema.safeParse(data);

        if (!productParsed.success)
            throw new Error(productParsed.error.message);

        // 1. Preparar data
        const product = productParsed.data;
        product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
        const { id, inStock, categoryId, ...rest } = product;

        // 2. Transaccion

        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: any;
            const tagsArray = rest.tags
                .split(",")
                .map((tag) => tag.trim().toLowerCase());

            //2.1 Detertminar si es update o create
            if (id) {
                // Actualizar
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: tagsArray,
                        in_stock: inStock,
                        category_id: categoryId,
                    },
                });

                // console.log({ updateProduct: product });
            } else {
                // Crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[],
                        },
                        tags: {
                            set: tagsArray,
                        },
                        in_stock: inStock,
                        category_id: categoryId,
                    },
                });
            }

            // 2.2 Proceso de carga y guardado de imagenes
            if (formData.getAll("images")) {
                // [ 'https://url.x.jpg', 'https;//url/y.jpg' ]
                const respImages = await uploadImages(
                    formData.getAll("images") as File[]
                );

                
                // 2.2.1 Grabar imagenes en BD
                if (!respImages.success || !respImages.data) throw new Error(resp.message);

                
                const images = respImages.data!;
                await prisma.productImage.createMany({
                    data: images.map(
                        (image) =>
                            ({
                                url: image!,
                                product_id: (product as IProduct).id,
                            } as IProductImage)
                    ),
                });
            }

            return {
                product,
            };
        });

        resp.success = true;
        resp.data = prismaTx;

        // Todo: revalidtaPath
        revalidatePath(`admin/products`);
        revalidatePath(`admin/product/${prismaTx.product.slug}`);
        revalidatePath(`/products/${prismaTx.product.slug}`);
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};

const uploadImages = async (
    images: File[]
): Promise<{
    success: boolean;
    data: (string | null)[] | null;
    message?: string;
}> => {
    const resp: {
        success: boolean;
        data: (string | null)[] | null;
        message?: string;
    } = {
        success: false,
        data: null,
        message: "",
    };

    try {
        const uploadPromises = images.map(async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString("base64");

                return cloudinary.uploader
                    .upload(`data:image/png;base64,${base64Image}`, {
                        folder: "gardo-shop/products",
                    })
                    .then((r) => r.secure_url);
                // .catch((error)=>{
                //     console.log('Error subiendo imagen', index,error)
                //     return null
                // });
            } catch (error) {
                //console.log('Error procesando imagen', index)
                return null;
            }
        });

        // si ocurrió un error en el uploaPromise, el Promise.all emviara al catch externo
        const uploadImages = await Promise.all(uploadPromises);

        /*
        const uploadImagesNotNull = uploadImages.filter(image => image != null)
        console.log( {
            images: uploadImages,
            imagesNotNulls: uploadImagesNotNull
        })
        */

        resp.success = true;
        resp.data = uploadImages;
    } catch (error) {
        resp.message = getActionError(error);
    }

    return resp;
};
