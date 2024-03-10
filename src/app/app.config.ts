import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthenticationInterceptor } from './shared/interceptors/authentication.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideMarkdown(),
    provideHttpClient(
      withInterceptors([AuthenticationInterceptor, ErrorInterceptor])
    ),
  ],
};
