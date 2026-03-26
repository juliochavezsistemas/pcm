import { TemplateRef } from "@angular/core"

export interface IColumns {
    label: string
    name: string
    sort?: boolean
    align?: 'left' | 'center' | 'right'
    width?: string
    combine?: (row: any) => string
    html?: (row: any) => string
    template?: TemplateRef<any>
}