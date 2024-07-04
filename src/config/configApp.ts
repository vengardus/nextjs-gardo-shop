import { Gender } from "@/interfaces/product.interface";
import { toCapitalize } from "@/utils/toCapitalize";

export const APP_CONST = {
    igv: 18,
    userRole: {
        user: "user",
        admin: "admin",
    },
    errorCode: {
        unAuthenticated: 401,
        unAuthorized: 403,
    },
    pagination: {
        take: 6,
        max_page_for_view: 7,
    },
    metaModel: {
        user: {
            verboseName: "usuario",
            verboseNamePlural: "usuarios",
        },
        product: {
            verboseName: "producto",
            verboseNamePlural: "productos",
        },
        order: {
            verboseName: "orden",
            verboseNamePlural: "ordenes",
        },
    },
};

export const dataApp = {
    roles: [
        {
            value: APP_CONST.userRole.admin,
            label: "Administrador",
        },
        {
            value: APP_CONST.userRole.user,
            label: "Usuario",
        },
    ],
    // gender: [
    //     {
    //         value:'men',
    //         label:'Men'
    //     },
    //     {
    //         value:'women',
    //         label:'Women'
    //     },
    //     {
    //         value:'kid',
    //         label:'Kid'
    //     },
    //     {
    //         value:'unisex',
    //         label:'Unisex'
    //     },
    // ],
    genders: ():{value:string, label:string}[] => {
        let lista = []
        for (const key in enumGender) {
            lista.push({value:key, label:toCapitalize(key)})
        }
        return lista
    }
};

// Gender
export enum enumGender {
    men = "men",
    women ="women",
    kid = "kid",
    unisex = "unisex",
}

export const labelGender: Record<Gender, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "todos",
};

