import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn
} from '@angular/forms';

export function passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value
        if (!value) return null
        const errors: any = {}
        if (value.length < 8) {
            errors.minLength = true
        }
        if (!/[A-Z]/.test(value)) {
            errors.uppercase = true
        }
        if (!/[a-z]/.test(value)) {
            errors.lowercase = true
        }
        if (!/\d/.test(value)) {
            errors.number = true
        }
        if (!/[@$!%*?&]/.test(value)) {
            errors.special = true
        }
        return Object.keys(errors).length ? errors : null
    }
}
