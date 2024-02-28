import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import {
  UserLoginApiDto,
  User,
  UserApiResponse,
  UserRegisterApiDto,
  UserUpdateApiDto,
} from '../interfaces/users-api.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  endpoint = environment.endpointDomain + 'users';
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  loginUser(payload: UserLoginApiDto): Observable<User> {
    return this.http
      .post<UserApiResponse>(this.endpoint + '/login', payload)
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.user.token);
          return response.user;
        })
      );
  }

  registerUser(payload: UserRegisterApiDto): Observable<User> {
    return this.http.post<UserApiResponse>(this.endpoint, payload).pipe(
      map((response) => {
        localStorage.setItem('token', response.user.token);
        return response.user;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http.get<UserApiResponse>(this.endpoint, { headers }).pipe(
      map((response) => {
        return response.user;
      })
    );
  }

  updateCurrentUser(payload: UserUpdateApiDto): Observable<User> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .put<UserApiResponse>(this.endpoint, payload, { headers })
      .pipe(
        map((response) => {
          return response.user;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
