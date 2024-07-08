"use server"

import { v2 as cloudinary } from "cloudinary";
import { IResponseAction } from "@/interfaces/app/response.interface"
import { initResponseAction } from "@/utils/initResponseAction"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getActionError } from "@/utils/getActionError";
import { APP_CONST } from "@/config/configApp";

// Configuration Cloudinary
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async(imageId:number, imageUrl:string):Promise<IResponseAction> => {
    const resp = initResponseAction()

    if (!imageUrl.startsWith('http')) {
        resp.message = 'No se pueden eliminar imágenes del servidor'
        return resp
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0]?? ''

    try {
        const respImage = await cloudinary.uploader.destroy(`${APP_CONST.cloudinary.pathProducts}${imageName}`)

        if ( respImage.result && respImage.result !== 'ok') 
            throw new Error('Imagen no se pudo eliminar en el servidor')
            

        const deleteImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        resp.success = true
        resp.data = {
            imageName,
            deleteImage,
            respImage 
        }

        // revalidar los paths
        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/product/${deleteImage.product.slug}`)
        revalidatePath(`/products/${deleteImage.product.slug}`)


    } catch (error) {
        resp.message = getActionError(error)
        console.log(resp.message)
    }

    console.log(resp)

    return resp
}