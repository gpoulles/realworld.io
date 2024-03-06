import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Profile } from '../interfaces/profile.interface';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { inject } from '@angular/core';

export const ProfileDataResolver: ResolveFn<Profile> = (
  route: ActivatedRouteSnapshot
): Observable<Profile> => {
  const username = route.params['username'];
  return inject(ProfileService).getProfile(username);
};
