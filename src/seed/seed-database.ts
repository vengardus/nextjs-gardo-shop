import { initialData } from "./seed";
import prisma from "../lib/prisma"

const main = async () => {
    // console.log(initialData);

    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ]
    )

    console.log('Seed ejecutado correctamente');
};

(() => {
    if (process.env.NODE_ENV === "production") return;
    main();
})();
