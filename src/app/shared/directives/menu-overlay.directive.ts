import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2
} from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Directive({
  selector: '[appMenuOverlay]'
})

export class MenuOverlayDirective {
  private el = inject(ElementRef)
  private renderer = inject(Renderer2)
  sidebarVisible = input<boolean>()
  layoutService = inject(LayoutService)

  constructor() {
    effect(() => {
      const isVisible = this.layoutService.overlayVisible()
      this.updateVisibility(isVisible)
    })
  }

  private updateVisibility(isVisible: boolean): void {
    if (isVisible) {
      this.renderer.removeClass(this.el.nativeElement, 'hidden')
      this.renderer.addClass(this.el.nativeElement, 'bg-black')
      this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'false')
      this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0')
      this.el.nativeElement.focus()
    } else {
      this.renderer.addClass(this.el.nativeElement, 'bg-black')
      this.renderer.addClass(this.el.nativeElement, 'hidden')
      this.renderer.setAttribute(this.el.nativeElement, 'aria-hidden', 'true')
      this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1')
    }
  }

  @HostListener('click')
  handleClick = (): void => {
    this.layoutService.closeAll()
  }

  @HostListener('window:keydown', ['$event'])
  handleEscape = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.layoutService.closeAll()
    }
  }
}
