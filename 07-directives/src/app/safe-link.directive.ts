import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true
})
export class SafeLinkDirective {
  @Input({required:true}) queryParam : string = 'myapp';

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  @HostListener('click', ['$event'])
  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you really want to leave this page?');
    if (wantsToLeave) {
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam;

      return;
    }
    event.preventDefault();
  }

}
