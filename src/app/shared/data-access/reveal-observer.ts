import { DestroyRef, DOCUMENT, inject, Service } from '@angular/core';
import { EMPTY, filter, fromEvent, map, merge, Observable, of, share, Subject, take } from 'rxjs';
import { reducedMotionQuery } from '../constants/motion';
import { RevealState } from '../types/reveal-state';

// One IntersectionObserver for every appReveal element. Elements reveal once, slightly
// above the bottom edge so the motion is seen.
@Service()
export class RevealObserver {
  private readonly view = inject(DOCUMENT).defaultView;
  private readonly motion = this.view?.matchMedia(reducedMotionQuery);
  private readonly entries$ = new Subject<IntersectionObserverEntry>();
  private readonly observer =
    this.view && 'IntersectionObserver' in this.view
      ? new IntersectionObserver((entries) => entries.forEach((entry) => this.entries$.next(entry)), {
          rootMargin: '0px 0px -10% 0px',
        })
      : undefined;
  private readonly reducedMotion$ = this.motion
    ? fromEvent<MediaQueryListEvent>(this.motion, 'change').pipe(
        filter((event) => event.matches),
        share(),
      )
    : EMPTY;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.observer?.disconnect());
  }

  // Emits once: 'revealed' to animate, 'visible' to show without motion.
  reveal(element: HTMLElement): Observable<RevealState> {
    const observer = this.observer;
    if (!observer || this.motion?.matches) return of('visible');

    return new Observable<RevealState>((subscriber) => {
      const subscription = merge(
        this.entries$.pipe(
          filter((entry) => entry.target === element),
          map(toRevealState),
          filter((state) => state !== undefined),
        ),
        fromEvent(element, 'focusin').pipe(map(() => 'visible' as const)),
        this.reducedMotion$.pipe(map(() => 'visible' as const)),
      )
        .pipe(take(1))
        .subscribe(subscriber);

      observer.observe(element);
      return () => {
        subscription.unsubscribe();
        observer.unobserve(element);
      };
    });
  }
}

// Elements already scrolled past (e.g. restored scroll on Back) appear without motion.
function toRevealState({ isIntersecting, boundingClientRect, rootBounds }: IntersectionObserverEntry) {
  if (isIntersecting) return 'revealed';
  return boundingClientRect.bottom <= (rootBounds?.top ?? 0) ? 'visible' : undefined;
}
