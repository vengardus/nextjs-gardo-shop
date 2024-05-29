import { initialData } from "./seed";

interface abc {
    x: number;
}

const main = async () => {
    console.log(initialData);
};

(() => {
    if (process.env.NODE_ENV === "production") return;
    main();
})();
