import { Gender } from "@/interfaces/product.interface";

export const labelGender: Record<Gender, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "todos",
};

export const APP_CONST = {
    igv: 18,
    userRole: {
        user: 'user',
        admin: 'admin'
    },
    errorCode: {
        unAuthenticated: 401,
        unAuthorized: 403
    },
    pagination: {
        take: 2,
        max_page_for_view: 7
    }
};
