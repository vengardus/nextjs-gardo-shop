import { initialData } from "./seed";
import prisma from "../lib/prisma";

const main = async () => {
    // console.log(initialData);

    // 1. Elininar registros
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.country.deleteMany();
    await prisma.userAddress.deleteMany();

    const { categories, products, users, countries } = initialData;

    // 2. Insertar catagorías
    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({
        data: categoriesData,
    });

    // 3. Obtener id de las categoras insertadas para posterior relacioón con productos
    const categoriesDB = await prisma.category.findMany();
    const categoriesMap = categoriesDB.reduce((accum, current) => {
        accum[current.name.toLowerCase()] = current.id;
        return accum;
    }, {} as Record<string, string>);

    // 4. Insertar productos

    products.forEach(async (product) => {
        const { type, inStock, images, ...rest } = product;
        const newProduct = await prisma.product.create({
            data: {
                ...rest,
                in_stock: inStock,
                category_id: categoriesMap[type],
            },
        });

        // 4.1 Insertar imagenes
        const imnagesData = images.map((image) => ({
            url: image,
            product_id: newProduct.id,
        }));

        await prisma.productImage.createMany({
            data: imnagesData,
        });
    });

    // 5. Insertar usuarios
    await prisma.user.createMany({
        data: users,
    });

    // 6. Insertar countries
    await prisma.country.createMany({
        data: countries
    })

    console.log("Seed ejecutado correctamente");
};

(() => {
    if (process.env.NODE_ENV === "production") return;
    main();
})();
