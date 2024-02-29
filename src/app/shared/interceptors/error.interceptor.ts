import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorApiResponse } from '../interfaces/error.interface';

export function ErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((error: ErrorApiResponse) => {
      if (error.error && error.error.errors) {
        const formattedErrors = Object.entries(error.error.errors).flatMap(
          ([key, messages]) => messages.map((message) => `${key} ${message}`)
        );

        const modifiedError = new HttpErrorResponse({
          error: { ...error.error, errorMessages: formattedErrors },
        });

        return throwError(() => modifiedError);
      }
      return throwError(() => error);
    })
  );
}
