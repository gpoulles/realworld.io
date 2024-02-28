import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import {
  UserLoginApiDto,
  User,
  UserApiResponse,
  UserRegisterApiDto,
} from '../interfaces/users-api.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  endpoint = environment.endpointDomain + 'users';
  constructor(private http: HttpClient) {}

  loginUser(payload: UserLoginApiDto): Observable<User> {
    return this.http
      .post<UserApiResponse>(this.endpoint + '/login', payload)
      .pipe(
        map((response) => {
          return response.user;
        })
      );
  }

  registerUser(payload: UserRegisterApiDto): Observable<User> {
    return this.http.post<UserApiResponse>(this.endpoint, payload).pipe(
      map((response) => {
        return response.user;
      })
    );
  }
}
