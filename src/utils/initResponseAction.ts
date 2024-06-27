import { IResponseAction } from "@/interfaces/response.interface";

export const initResponseAction = ():IResponseAction => {
    const resp: IResponseAction = {
        success: false,
        pagination: {
            currentPage: 0,
            totalPages: 0
        }
    };
    return resp
}