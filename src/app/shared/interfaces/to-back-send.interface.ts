import { OperationClient } from "../enums/option-client.enum"

export interface ToBackSend {
    operation: OperationClient | string
    data: any
    rol: string
    id: string
    status: 'new' | 'old' | 'none' | 'unsolved'
    rolTarget?: string
}