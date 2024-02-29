import { Injectable, signal } from '@angular/core';
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
  currentUser = signal<User | null>(null);

  usersEndpoint = environment.endpointDomain + 'users';
  userEndpoint = environment.endpointDomain + 'user';
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  loginUser(payload: UserLoginApiDto): Observable<User> {
    return this.http
      .post<UserApiResponse>(this.usersEndpoint + '/login', payload)
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.user.token);
          this.currentUser.set(response.user);
          return response.user;
        })
      );
  }

  registerUser(payload: UserRegisterApiDto): Observable<User> {
    return this.http.post<UserApiResponse>(this.usersEndpoint, payload).pipe(
      map((response) => {
        localStorage.setItem('token', response.user.token);
        this.currentUser.set(response.user);
        return response.user;
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http.get<UserApiResponse>(this.userEndpoint, { headers }).pipe(
      map((response) => {
        this.currentUser.set(response.user);
        return response.user;
      })
    );
  }

  updateCurrentUser(payload: UserUpdateApiDto): Observable<User> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .put<UserApiResponse>(this.userEndpoint, payload, { headers })
      .pipe(
        map((response) => {
          this.currentUser.set(response.user);
          return response.user;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}
