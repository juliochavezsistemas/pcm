import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PasswordToggleService {
  private visibility = signal<Record<string, boolean>>({})

  public isPasswordVisible = (field: string): boolean => {
    return this.visibility()[field] || false
  }

  public togglePasswordVisibility = (field: string): void => {
    const currentState = this.visibility()
    const updatedState = { ...currentState, [field]: !currentState[field] }
    this.visibility.set(updatedState)
  }
}
