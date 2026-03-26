import {
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-title-modal',
  imports: [],
  templateUrl: './title-modal.component.html',
  styleUrl: './title-modal.component.scss'
})
export class TitleModalComponent {
  public detail = input.required<string>()
  public title = input.required<string>()
  public orientation = input<string>('col')
  public isFullNameLoaded = input<boolean>(false)
}
