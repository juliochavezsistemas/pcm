import { Component, output } from '@angular/core';
import { _authMe } from '../../../signals/models/auth-me';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected onClick = output()
  authMe = _authMe
}
