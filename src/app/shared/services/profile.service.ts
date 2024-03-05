import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import {
  ProfileApi,
  ProfileApiResponse,
} from '../interfaces/profile-api.interface';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  getProfile(username: string): Observable<Profile> {
    return this.http
      .get<ProfileApiResponse>(this.generateEndpoint(username))
      .pipe(
        map((response) => {
          return this.mapProfile(response.profile);
        })
      );
  }

  follow(username: string): Observable<Profile> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .post<ProfileApiResponse>(
        this.generateEndpoint(username, true),
        {},
        { headers }
      )
      .pipe(
        map((response) => {
          return this.mapProfile(response.profile);
        })
      );
  }

  unfollow(username: string): Observable<Profile> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .delete<ProfileApiResponse>(this.generateEndpoint(username, true), {
        headers,
      })
      .pipe(
        map((response) => {
          return this.mapProfile(response.profile);
        })
      );
  }

  mapProfile(profile: ProfileApi): Profile {
    return {
      name: profile.username,
      bio: profile.bio,
      image: profile.image,
      following: profile.following,
    };
  }

  private generateEndpoint(username: string, follow: boolean = false) {
    const appendix = follow ? '/follow' : '';
    return environment.endpointDomain + '/profile/' + username + appendix;
  }
}
