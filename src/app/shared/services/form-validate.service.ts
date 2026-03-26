import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class FormValidateService {
  private getError = (control: AbstractControl, controlName: string): string => {
    if (control && control.errors) {
      if (control.errors['required']) {
        return `Falta ingresar ${this.getFieldLabel(controlName)}.`
      } else if (control.errors['min']) {
        return `${this.getFieldLabel(controlName)} debe ser al menos ${control.errors['min'].min}.`
      } else if (control.errors['max']) {
        return `${this.getFieldLabel(controlName)} no puede ser mayor a ${control.errors['max'].max}.`
      } else if (control.errors['minlength']) {
        return `Longitud mínima de ${control.errors['minlength'].requiredLength} caracteres.`
      } else if (control.errors['maxlength']) {
        return `Longitud máxima de ${control.errors['maxlength'].requiredLength} caracteres.`
      } else if (control.errors['pattern']) {
        if (controlName.includes('time')) {
          return `Formato inválido en ${this.getFieldLabel(controlName)}. Use el formato HH:mm:ss.`
        }
        if (controlName.includes('password')) {
          return `La contraseña debe tener al menos: una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).`
        }
        return `Formato inválido en ${this.getFieldLabel(controlName)}.`
      }
      else if (control.errors['uppercase']) {
        return 'La contraseña debe incluir al menos una letra mayúscula.';
      } else if (control.errors['lowercase']) {
        return 'La contraseña debe incluir al menos una letra minúscula.';
      } else if (control.errors['number']) {
        return 'La contraseña debe incluir al menos un número.';
      } else if (control.errors['special']) {
        return 'La contraseña debe incluir al menos un carácter especial (@$!%*?&).';
      } else if (control.errors['minLength']) {
        return 'La contraseña debe tener al menos 8 caracteres.';
      } else if (control.errors['sameAsOldPassword']) {
        return 'La nueva contraseña no puede ser igual a la anterior.';
      } else if (control.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden.';
      }
    }
    return ''
  }

  showError = (controlName: string, formGroup: FormGroup): boolean => {
    const control = formGroup.get(controlName)
    return control ? control.invalid && (control.touched || control.dirty) : false
  }

  getErrorMessage = (controlName: string, formGroup: FormGroup): string => {
    const control = formGroup.get(controlName)
    if (control) return this.getError(control, controlName)
    return ''
  }

  validatePasswords = (formGroup: FormGroup): ValidationErrors | null => {
    const oldPassword = formGroup.get('currentPassword')?.value;
    const newPassword = formGroup.get('newPassword');
    const repeatNewPassword = formGroup.get('repeatNewPassword');
    // Validar que no sea igual a la contraseña actual
    if (oldPassword && newPassword?.value && oldPassword === newPassword.value) {
      newPassword.setErrors({ sameAsOldPassword: true })
    } else if (newPassword?.hasError('sameAsOldPassword')) {
      newPassword.updateValueAndValidity({ onlySelf: true, emitEvent: false })
    }
    // Validar que ambas coincidan
    if (newPassword?.value && repeatNewPassword?.value && newPassword.value !== repeatNewPassword.value) {
      repeatNewPassword.setErrors({ passwordMismatch: true })
    } else if (repeatNewPassword?.hasError('passwordMismatch')) {
      repeatNewPassword.updateValueAndValidity({ onlySelf: true, emitEvent: false })
    }
    return null
  }

  private getFieldLabel = (controlName: string): string => {
    switch (controlName) {
      case 'nombres':
        return 'nombres'
      case 'apellidos':
        return 'apellidos'
      case 'numero_documento':
        return 'núm. de doc.'
      case 'razon_social':
        return 'razón social'
      case 'ruc':
        return 'RUC'
      case 'correo':
        return 'email'
      case 'telefono':
        return 'telefono'
      case 'direccion':
        return 'direccion'
      case 'representante_legal':
        return 'rep. legal'
      case 'email':
        return 'email'
      case 'titulo':
        return 'título'
      case 'descripcion':
        return 'descripción'
      case 'anio_graduacion':
        return 'año'
      default:
        return 'campo'

    }
  }
}
