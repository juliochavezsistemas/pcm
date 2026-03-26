import {
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidateService } from '../services/form-validate.service';

@Directive({
  selector: '[appValidateInput]'
})

export class ValidateInputDirective {
  private validateFormService = inject(FormValidateService)
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)

  private sunscription = signal<Subscription | null>(null)
  private smallElement = signal<HTMLElement | null>(null)

  public controlName = input.required<string>()
  public formGroup = input.required<FormGroup>()

  ngOnInit(): void {
    this.sunscription.set(
      this.formGroup().statusChanges.subscribe(
        () => {
          this.showError()
        })
    )
  }

  ngAfterViewInit(): void {
    this.showError()
  }

  save = () => {

  }

  showError = (): void => {
    const parent = this.renderer.parentNode(this.el.nativeElement)
    if (this.smallElement()) {
      this.renderer.removeChild(parent, this.smallElement())
      this.smallElement.set(null)
    }
    if (this.validateFormService.showError(this.controlName(), this.formGroup())) {
      const errorText = this.validateFormService.getErrorMessage(this.controlName(), this.formGroup())
      const small = this.renderer.createElement('div')
      this.renderer.setStyle(small, 'color', '#D93030');
      const texto = this.renderer.createText(errorText)
      this.renderer.appendChild(small, texto)
      const nextSibling = this.renderer.nextSibling(this.el.nativeElement)
      this.renderer.insertBefore(parent, small, nextSibling)
      this.smallElement.set(small)
    }
  }

  ngOnDestroy(): void {
    this.sunscription()?.unsubscribe()
  }
}
