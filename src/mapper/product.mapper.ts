import type  { IProduct } from "@/interfaces/product.interface";
import type { Product, ProductImage } from "@prisma/client";

export class ProductMapper {

    static IProductFromPrismaProduct(productsDB: ({ProductImage: {url:string, product_id:string}[]} & Product)[]): IProduct[] {
        const products = productsDB.map((product) => ({
            ...product,
            images: product.ProductImage.map((image) => image.url),
            inStock: product.in_stock,
            
        }));

        return products
    }

}