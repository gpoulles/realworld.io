import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TagsApiResponse } from '../interfaces/tags-api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private endpoint = environment.endpointDomain + 'tags';
  constructor(private http: HttpClient) {}

  getTags(): Observable<string[]> {
    return this.http.get<TagsApiResponse>(this.endpoint).pipe(
      map((response) => {
        return response.tags;
      })
    );
  }
}
