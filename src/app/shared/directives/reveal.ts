import { afterNextRender, DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';
import { RevealObserver } from '../data-access/reveal-observer';
import { RevealState } from '../types/reveal-state';

// Hidden from the first render until the element enters the viewport; focus shows it at once.
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal-pending]': "state() === 'pending'",
    '[class.reveal-visible]': "state() === 'revealed'",
    '(focusin)': 'show()',
  },
})
export class Reveal {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly observer = inject(RevealObserver);
  protected readonly state = signal<RevealState>(this.observer.enabled ? 'pending' : 'visible');

  constructor() {
    if (this.state() !== 'pending') return;

    afterNextRender(() =>
      this.observer.observe(this.element, (animate) => this.state.set(animate ? 'revealed' : 'visible')),
    );
    inject(DestroyRef).onDestroy(() => this.observer.unobserve(this.element));
  }

  protected show(): void {
    this.observer.unobserve(this.element);
    this.state.set('visible');
  }
}
