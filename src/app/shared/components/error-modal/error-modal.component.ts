import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  imports: [],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {
  public visible = input<boolean>(false);
  public errores = input<string[]>([]);
  public close = output<void>();

  onClose() {
    this.close.emit();
  }
}
