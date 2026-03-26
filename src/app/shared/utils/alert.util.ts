import Swal from 'sweetalert2'
import { IOptionSweetAlert } from "../interfaces/option-sweet-alert.interface"

export class Alert {
    static confirm = ({ cancelButtonColor, cancelButtonText, confirmButtonColor, confirmButtonText, icon, onCancel, onConfirm, showCancelButton, text, html, title }: IOptionSweetAlert) => {
        Swal
            .fire({
                title: title || 'Are sure?',
                text: text || 'This action cannot be undone!',
                icon: icon || 'info',
                html: html,
                showCancelButton: showCancelButton ?? false,
                confirmButtonColor: confirmButtonColor || "#3B82F6",
                cancelButtonColor: cancelButtonColor || "#EF4444",
                confirmButtonText: confirmButtonText || 'Yes',
                cancelButtonText: cancelButtonText || 'Cancel',
                customClass: {
                    popup: 'swal-top-index'
                }
            })
            .then((result) => {
                if (result.isConfirmed) {
                    onConfirm?.()
                } else {
                    onCancel?.()
                }
            })
    }
}