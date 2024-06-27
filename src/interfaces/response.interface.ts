export interface IResponseAction {
    success: boolean
    message?: string
    data?: any
    errorCode?: number
    pagination?: {
        currentPage: number,
        totalPages: number
    }
}