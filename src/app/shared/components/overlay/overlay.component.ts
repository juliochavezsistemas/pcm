import {
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-overlay',
  imports: [],
  templateUrl: './overlay.component.html',
  standalone: true,
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent {
  public isLoading = input.required<boolean>()
  public message = input.required<string>()
  public showProgress = input<number>()
  public progress = input<number>()
}
