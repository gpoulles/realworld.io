import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function AuthenticationInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authToken = localStorage.getItem('token');

  if (authToken && req.headers.has('addAuthToken')) {
    req = req.clone({
      headers: req.headers
        .set('Authorization', `Token ${authToken}`)
        .delete('addAuthToken'),
    });
  } else if (req.headers.has('addAuthToken')) {
    req = req.clone({
      headers: req.headers.delete('addAuthToken'),
    });
  }

  return next(req);
}
