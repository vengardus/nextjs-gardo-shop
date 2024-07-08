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
    cloudinary: {
        pathProducts: 'gardo-shop/products/'
    }
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
    },

    imagesLCPToPriority : [
        '100042307_0_2000.jpg',
        '1473809-00-A_1_2000.jpg',
        '1506211-00-A_0_2000.jpg',
        '1549268-00-A_0_2000.jpg',
        '1549275-00-A_0_2000.jpg',
        '1700280-00-A_0_2000.jpg',
        '1740140-00-A_0_2000.jpg',
        '1740245-00-A_0_2000.jpg',
        '1740250-00-A_0_2000.jpg',
        '1740280-00-A_0_2000.jpg',
        '1740507-00-A_0_2000.jpg',
        '1740535-00-A_0_2000.jpg',
        '1741416-00-A_0_2000.jpg',
        '1742702-00-A_0_2000.jpg',
        '5645680-00-A_0_2000.jpg',
        '7652410-00-A_0.jpg',
        '7652465-00-A_0_2000.jpg',
        '7654393-00-A_2_2000.jpg',
        '7654399-00-A_0_2000.jpg',
        '8529198-00-A_0_2000.jpg',
        '8529312-00-A_0_2000.jpg',
        '8529342-00-A_0_2000.jpg',
        '8529354-00-A_0_2000.jpg',
        '8764734-00-A_0_2000.jpg',
        '8765120-00-A_0_2000.jpg',
        '8764813-00-A_0_2000.jpg',
        '8765115-00-A_0_2000.jpg',
        '9877040-00-A_0_2000.jpg',
        'kqpert65eywhz98uratm.webp',
        'placeholder.jpg',
    ]
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

