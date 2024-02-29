import { HttpErrorResponse } from '@angular/common/http';

interface ErrorMessages {
  [key: string]: string[];
}

export interface ErrorApiResponse extends HttpErrorResponse {
  error: {
    errors: ErrorMessages;
  };
}

export interface ErrorResponse extends HttpErrorResponse {
  errorMessages?: string[];
}
