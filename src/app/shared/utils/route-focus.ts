import { afterNextRender, DOCUMENT, inject, Injector } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, pairwise } from 'rxjs';

// After a client-side page change, moves focus to the new page h1. pairwise skips the
// first load; query-only changes (filters) keep focus where it is. Call in an injection context.
export function focusHeadingOnPageChange(): void {
  const document = inject(DOCUMENT);
  const injector = inject(Injector);

  inject(Router)
    .events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split(/[?#]/)[0]),
      pairwise(),
      filter(([previous, current]) => previous !== current),
      takeUntilDestroyed(),
    )
    .subscribe(() =>
      afterNextRender(() => focusPageHeading(document), { injector }),
    );
}

function focusPageHeading(document: Document): void {
  const heading = document.querySelector<HTMLElement>('main h1');
  if (!heading) return;

  heading.tabIndex = -1;
  heading.focus({ preventScroll: true });
}
