import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = () => {
  if (localStorage.getItem('token')) return true;
  inject(Router).navigate(['/']);
  return false;
};
