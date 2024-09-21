import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { map } from 'rxjs';

export const MockInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (!isDevMode()) return next(req);

  const clonedRequest = req.clone({
    url: `assets${req.url}.json`,
    method: 'GET',
  });

  return next(clonedRequest).pipe(
    map((event: HttpEvent<unknown>) => {
      if (event instanceof HttpRequest && req.method !== 'GET') {
        // modify response body here
        // return event.clone({ body: req.body });
      }

      return event;
    })
  );
};
