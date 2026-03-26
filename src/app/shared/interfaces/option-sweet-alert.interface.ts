
export interface IOptionSweetAlert {
    title?: string
    text?: string
    html?: string
    icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonColor?: string
    cancelButtonColor?: string
    onConfirm?: () => void | Promise<void>
    onCancel?: () => void | Promise<void>
}