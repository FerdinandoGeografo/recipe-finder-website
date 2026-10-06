import { inject } from '@angular/core';
import { isActive, Router, ViewTransitionInfo } from '@angular/router';

// Filters only change query params: skip the page transition so typing stays instant.
export function skipQueryOnlyTransitions({ transition }: ViewTransitionInfo): void {
  const router = inject(Router);
  const target = router.currentNavigation()?.finalUrl;
  const samePage =
    target &&
    isActive(target, router, {
      paths: 'exact',
      matrixParams: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
    })();

  if (samePage) transition.skipTransition();
}
