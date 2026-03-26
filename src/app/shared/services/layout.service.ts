import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LayoutService {
  sidebarVisible = signal<boolean>(false)
  overlayVisible = signal<boolean>(false)

  toogleSidebar = (): void => {
    this.sidebarVisible.update((visible) => {
      const newValue = !visible
      this.overlayVisible.set(newValue)
      return newValue
    })
  }

  closeAll = (): void => {
    this.sidebarVisible.set(false)
    this.overlayVisible.set(false)
  }
}
