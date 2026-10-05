import { ActivatedRouteSnapshot, ViewTransitionInfo } from '@angular/router';

// Filters only change query params: skip the page transition so typing stays instant.
export function skipQueryOnlyTransitions({ transition, from, to }: ViewTransitionInfo) {
  const source = leaf(from);
  const target = leaf(to);

  if (
    source.routeConfig === target.routeConfig &&
    JSON.stringify(source.params) === JSON.stringify(target.params)
  ) {
    transition.skipTransition();
  }
}

function leaf(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  return snapshot.firstChild ? leaf(snapshot.firstChild) : snapshot;
}
