import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopEventPropagation]'
})
export class StopEventPropagationDirective {
  @HostListener("click", ["$event"])
  @HostListener("mousedown", ["$event"])
  onClick(event: Event): void {
    event.stopPropagation();
  }
}
