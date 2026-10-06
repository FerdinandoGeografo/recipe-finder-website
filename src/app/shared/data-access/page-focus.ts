import { afterNextRender, Injector, inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise } from 'rxjs';

// Moves focus to the page heading after a client-side page change, as a page load would
// reset it. pairwise skips the first load; query-only changes (filters) keep focus.
@Service()
export class PageFocus {
  private heading?: HTMLElement;

  constructor() {
    const injector = inject(Injector);

    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event.urlAfterRedirects.split(/[?#]/)[0]),
        pairwise(),
        filter(([previous, current]) => previous !== current),
        takeUntilDestroyed(),
      )
      .subscribe(() => afterNextRender(() => this.focusHeading(), { injector }));
  }

  register(heading: HTMLElement): void {
    this.heading = heading;
  }

  unregister(heading: HTMLElement): void {
    if (this.heading === heading) this.heading = undefined;
  }

  focusHeading(): void {
    this.heading?.focus({ preventScroll: true });
  }
}
