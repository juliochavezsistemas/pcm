import {
  Component,
  input,
  output
} from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [
    TooltipModule
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  item = input.required<any>()
  remove = output<string>()
}
