import { NgClass } from '@angular/common';
import {
  Component,
  inject,
  input,
  output
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { _authMe } from '../../../signals/models/auth-me';
import { Alert } from '../../../utils/alert.util';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  private router = inject(Router)
  private localStorageService = inject(LocalStorageService)
  private authService = inject(AuthService)

  public authMe = _authMe

  isLoading = output<boolean>()
  isChangePassword = input<boolean>(false)

  /** 🔹 Tiempo formateado en mm:ss (viene del padre) */
  limitTime = input('30:00')

  /** 🔹 Tiempo total en minutos (viene del padre) */
  tiempo = input(30)

  /** 🔹 Cálculo dinámico del total en segundos */
  get tiempoTotalSegundos() {
    return this.tiempo() * 60
  }

  protected apiUrl = environment.apiUrl
  protected noPhoto = environment.frontUrl + 'assets/images/no-image.png'

  /** 🔹 Calcula el porcentaje restante */
  porcentajeRestante() {
    const [min, sec] = this.limitTime().split(':').map(Number)
    const restante = min * 60 + sec
    const total = this.tiempoTotalSegundos
    return Math.max(0, (restante / total) * 100)
  }

  /** 🔹 Cambia color de la barra según tiempo restante */
  colorBarra() {
    const p = this.porcentajeRestante()
    if (p <= 10) return '#dc2626' // rojo
    if (p <= 30) return '#facc15' // amarillo
    return '#16a34a' // verde
  }

  /** 🔹 Cambia color del texto según tiempo */
  colorTiempo() {
    const [min, sec] = this.limitTime().split(':').map(Number)
    const totalSeg = min * 60 + sec
    if (totalSeg <= 60) return 'text-red blink'
    if (totalSeg <= 5 * 60) return 'text-yellow-600'
    return 'text-green-600'
  }

  /** ✅ Verifica si el usuario actual es Admin */
  get isAdmin() {
    const user = this.authMe()
    return user && (user.rol?.toLowerCase() === 'admin' || user.rol?.toLowerCase() === 'superadmin') //!MODIFICAR PARA NO MOSTRAR TEMPORIZADOR 
  }

  /** 🔹 Logout manual con confirmación */
  logout = () =>
    Alert.confirm({
      title: 'Confirmar cierre de sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, lo estoy',
      cancelButtonText: 'Cancelar',
      onConfirm: () => {
        this.isLoading.emit(true);
        this.authService.logout().subscribe({
          next: () => {
            this.localStorageService.clean()
            this.router.navigate(['auth'])
            this.isLoading.emit(false)
          },
          error: (error) => {
            console.error(error)
            this.isLoading.emit(false)
          }
        })
      }
    })
}