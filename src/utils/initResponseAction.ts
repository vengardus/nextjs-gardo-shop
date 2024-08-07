import { IResponseAction } from "@/interfaces/app/response.interface";

export const initResponseAction = ():IResponseAction => {
    const resp: IResponseAction = {
        success: false,
        data: null,
        pagination: {
            currentPage: 0,
            totalPages: 0
        },
    };
    return resp
}