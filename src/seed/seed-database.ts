import { initialData } from "./seed";
import prisma from "../lib/prisma"

const main = async () => {
    // console.log(initialData);

    // 1. Elininar registros
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]
    )

    // 2. Insertar catagorías
    const {categories} = initialData
    const categoriesData = categories.map((name) => ({name}))
    console.log(categoriesData)
    await prisma.category.createMany({
        data: categoriesData
    })

    console.log('Seed ejecutado correctamente');
};

(() => {
    if (process.env.NODE_ENV === "production") return;
    main();
})();
