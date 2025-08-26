import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true
})
export class LogDirective {
  private elementRef = inject(ElementRef);

  @HostListener('click')
  onClick() {
    console.log('CLICKED')
    console.log(this.elementRef.nativeElement);
  }
}
