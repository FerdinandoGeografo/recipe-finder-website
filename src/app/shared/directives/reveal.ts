import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { RevealState } from '../types/reveal-state';
import { reducedMotionQuery } from '../constants/motion';

@Directive({
  selector: '[appReveal]',
  host: {
    '[class.reveal-pending]': "state() === 'pending'",
    '[class.reveal-visible]': "state() === 'revealed'",
    '(focusin)': 'showImmediately()',
  },
})
export class Reveal {
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;
  protected readonly state = signal<RevealState>('visible');

  constructor() {
    afterNextRender(() => {
      const view = this.element.ownerDocument.defaultView;
      if (!view || !('IntersectionObserver' in view)) return;
      const motion = view.matchMedia(reducedMotionQuery);
      if (
        motion.matches ||
        this.element.contains(this.element.ownerDocument.activeElement)
      )
        return;

      const onMotionChange = () => {
        if (motion.matches) this.showImmediately();
      };
      motion.addEventListener('change', onMotionChange);
      this.observer = new IntersectionObserver((entries) => {
        if (
          this.state() !== 'pending' ||
          !entries.some((entry) => entry.isIntersecting)
        )
          return;
        this.state.set('revealed');
        this.observer?.disconnect();
      });
      this.state.set('pending');
      this.observer.observe(this.element);
      this.destroyRef.onDestroy(() => {
        this.observer?.disconnect();
        motion.removeEventListener('change', onMotionChange);
      });
    });
  }

  protected showImmediately(): void {
    this.observer?.disconnect();
    this.state.set('visible');
  }
}
