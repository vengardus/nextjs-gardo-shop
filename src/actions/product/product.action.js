"use server";

import { initialData } from "@/seed/seed";

export const getProductBySlug = async (slug) => {
    const product = await initialData.products.find(
        (product) => product.slug === slug
    );
    return product
};

export const getAllProductsByCategory = async (id) => {
    return await initialData.products
        .filter((product) => product.gender === id)
        .slice(0);
};
