import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function AuthenticationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authToken = localStorage.getItem('token');

  if (authToken && req.headers.has('addAuthToken')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Token ${authToken}`,
      },
    });
  }

  return next(req);
}
