import { IMetaData } from "./meta-data.interface"

export interface IPageableData<T, W> {
    header: W
    items: T
    total: number
    meta: IMetaData
}