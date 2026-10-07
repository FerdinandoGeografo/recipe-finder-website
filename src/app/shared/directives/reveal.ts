import { Directive, ElementRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RevealObserver } from '../data-access/reveal-observer';

// Hidden from the first render until the element enters the viewport; focus shows it at once.
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal-pending',
    '[class.reveal-pending]': "state() === 'pending'",
    '[class.reveal-visible]': "state() === 'revealed'",
  },
})
export class Reveal {
  protected readonly state = toSignal(
    inject(RevealObserver).reveal(
      inject<ElementRef<HTMLElement>>(ElementRef).nativeElement,
    ),
    { initialValue: 'pending' },
  );
}
