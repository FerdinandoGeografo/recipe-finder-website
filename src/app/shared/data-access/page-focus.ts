import { DOCUMENT, inject, Service } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { filter, map, pairwise } from 'rxjs';

// Moves focus after a client-side page change, as a page load would reset it. Scroll fires
// after the view renders and scroll is restored; pairwise skips the first load.
@Service()
export class PageFocus {
  private readonly document = inject(DOCUMENT);
  private heading?: HTMLElement;

  constructor() {
    inject(Router)
      .events.pipe(
        filter(
          (event): event is Scroll =>
            event instanceof Scroll &&
            event.routerEvent instanceof NavigationEnd,
        ),
        map(({ routerEvent, position }) => ({
          path: (routerEvent as NavigationEnd).urlAfterRedirects.split(
            /[?#]/,
          )[0],
          // The router passes null only for non-history navigations.
          isHistoryNavigation: position !== null,
          entryIndex:
            this.document.defaultView?.navigation?.currentEntry?.index,
        })),
        pairwise(),
        filter(([previous, current]) => previous.path !== current.path),
        takeUntilDestroyed(),
      )
      .subscribe(([previous, current]) =>
        this.focusTarget(previous.path, isBack(previous, current))?.focus({
          preventScroll: true,
        }),
      );
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

  // Back returns to the link that left this page, if it is still listed.
  private focusTarget(
    fromPath: string,
    isBackNavigation: boolean,
  ): HTMLElement | undefined {
    const returnLink = isBackNavigation
      ? this.document.querySelector<HTMLElement>(
          `main a[href="${CSS.escape(fromPath)}"]`,
        )
      : null;
    return returnLink ?? this.heading;
  }
}

interface PageVisit {
  isHistoryNavigation: boolean;
  entryIndex?: number;
}

// Forward lands on the heading. Without the Navigation API, any history step counts as back.
function isBack(previous: PageVisit, current: PageVisit): boolean {
  if (!current.isHistoryNavigation) return false;
  if (previous.entryIndex === undefined || current.entryIndex === undefined) {
    return true;
  }
  return current.entryIndex < previous.entryIndex;
}
