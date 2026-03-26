import { NgClass } from '@angular/common';
import {
  Component,
  effect,
  inject
} from '@angular/core';
import {
  FormsModule, ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../../../services/auth.service';
import { BaseAddUpdateComponent } from '../../../classes/base-add-update-component';
import { ValidateInputDirective } from '../../../directives/validate-input.directive';
import { FormValidateService } from '../../../services/form-validate.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { PasswordToggleService } from '../../../services/password-toggle.service';
import { passwordStrength } from '../../../validators/password-strength.validator';
import { _authMe } from '../../../signals/models/auth-me';
import { Alert } from '../../../utils/alert.util';
import { OverlayComponent } from '../../overlay/overlay.component';

@Component({
  selector: 'app-change-password',
  imports: [
    ButtonModule,
    OverlayComponent,
    MessageModule,
    FloatLabelModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ValidateInputDirective,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    NgClass
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})

export class ChangePasswordComponent extends BaseAddUpdateComponent {
  authMe = _authMe
  private router = inject(Router)
  private authService = inject(AuthService)
  private localStorageService = inject(LocalStorageService)

  constructor() {
    super()
    effect(() => {
      this.initForm()
    })
  }

  public passwordToggleService = inject(PasswordToggleService)
  public formValidateService = inject(FormValidateService)

  send = () => {
    Alert.confirm({
      title: 'Advertencia',
      text: 'Está a punto de modificar su contraseña. Esta acción reemplazará su contraseña actual y no podrá deshacerse.',
      confirmButtonText: 'Confirmar cambio',
      showCancelButton: true,
      cancelButtonText: 'Cancelar cambio',
      onConfirm: () => {
        this.isLoading.set(true)
        this.authService.changePassword(this.formGroup().value).subscribe({
          next: (value) => {
            if (value.success) {
              this.wrongMessage.set(value.message)
              this.authService.logout().subscribe({
                next: (value) => {
                  this.close()
                  this.isLoading.set(false)
                  this.localStorageService.clean()
                  this.router.navigate(['auth'])
                },
                error: (error) => {
                  this.wrongMessage.set(error.error.message)
                  this.isLoading.set(false)
                }
              })
            }
          },
          error: (error) => {
            this.wrongMessage.set(error.error.message)
            this.isLoading.set(false)
          }
        })

      }
    })
  }

  private initForm = (): void =>
    this.formGroup.set(
      this.formBuilder.group({
        id: [this.authMe().id, [Validators.required]], //
        oldPassword: [, [Validators.required, Validators.maxLength(120)]], //
        newPassword: [, [Validators.required, Validators.maxLength(120), passwordStrength()]], //
        repeatNewPassword: [, [Validators.required, Validators.maxLength(120), passwordStrength()]], //
      },
        { validators: this.formValidateService.validatePasswords }
      )
    )
}
// 123456Aa@.