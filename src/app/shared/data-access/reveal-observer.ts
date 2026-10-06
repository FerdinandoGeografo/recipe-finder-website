import { DestroyRef, DOCUMENT, inject, Service } from '@angular/core';
import { reducedMotionQuery } from '../constants/motion';

type RevealCallback = (animate: boolean) => void;

// One IntersectionObserver for every appReveal element. Elements reveal once, slightly
// above the bottom edge so the motion is seen.
@Service()
export class RevealObserver {
  private readonly view = inject(DOCUMENT).defaultView;
  private readonly motion = this.view?.matchMedia(reducedMotionQuery);
  private readonly callbacks = new Map<Element, RevealCallback>();
  private readonly observer =
    this.view && 'IntersectionObserver' in this.view
      ? new IntersectionObserver((entries) => this.onIntersect(entries), {
          rootMargin: '0px 0px -10% 0px',
        })
      : undefined;

  constructor() {
    const onMotionChange = () => {
      if (this.motion?.matches) this.revealAll();
    };
    this.motion?.addEventListener('change', onMotionChange);
    inject(DestroyRef).onDestroy(() => {
      this.motion?.removeEventListener('change', onMotionChange);
      this.observer?.disconnect();
    });
  }

  // False without IntersectionObserver or with reduced motion: content is shown as is.
  get enabled(): boolean {
    return !!this.observer && !this.motion?.matches;
  }

  observe(element: Element, reveal: RevealCallback): void {
    this.callbacks.set(element, reveal);
    this.observer?.observe(element);
  }

  unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observer?.unobserve(element);
  }

  private onIntersect(entries: IntersectionObserverEntry[]): void {
    for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
      // Elements already scrolled past (e.g. restored scroll on Back) appear without motion.
      const passed = boundingClientRect.bottom <= (rootBounds?.top ?? 0);
      if (!isIntersecting && !passed) continue;

      this.callbacks.get(target)?.(isIntersecting);
      this.unobserve(target);
    }
  }

  private revealAll(): void {
    for (const [element, reveal] of this.callbacks) {
      reveal(false);
      this.unobserve(element);
    }
  }
}
