import { HttpInterceptorFn } from '@angular/common/http';
import { switchMap, timer } from 'rxjs';

import { REQUEST_DELAY_MS } from '../constants/request-delay';

export const requestDelayInterceptor: HttpInterceptorFn = (request, next) => {
  const delayMs = request.context.get(REQUEST_DELAY_MS);
  return delayMs > 0
    ? timer(delayMs).pipe(switchMap(() => next(request)))
    : next(request);
};
