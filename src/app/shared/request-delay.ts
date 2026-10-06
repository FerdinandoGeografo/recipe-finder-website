import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { switchMap, timer } from 'rxjs';

export const REQUEST_DELAY_MS = new HttpContextToken<number>(() => 0);

export const requestDelayInterceptor: HttpInterceptorFn = (request, next) => {
  const delayMs = request.context.get(REQUEST_DELAY_MS);
  return delayMs > 0
    ? timer(delayMs).pipe(switchMap(() => next(request)))
    : next(request);
};
