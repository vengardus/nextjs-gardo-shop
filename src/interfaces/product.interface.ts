export interface IProduct {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //Todo:  type: ValidTypes;
    gender: Gender;

    ProductImage: IProductImage[]
}

export interface IProductImage {
    id?: number,
    url: string,
    product_id?: string
}

export interface ICartProduct {
    id: string;
    slug: string;
    title: string;
    quantity: number;
    price: number;
    size: Size;
    image: string;
}

export type Gender = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
