
export interface IApiResponse<T = any> {
    message: string
    data: T
    success: boolean
}