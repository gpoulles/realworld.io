import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticleApiResponse } from '../interfaces/article-api.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private readonly http: HttpClient) {}

  endpoint = '/articles/';

  favoriteArticle(
    slug: string
  ): Observable<{ favoritesCount: number; favorited: boolean }> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .post<ArticleApiResponse>(
        this.endpoint + slug + '/favorites',
        {},
        { headers }
      )
      .pipe(
        map((response) => {
          return {
            favoritesCount: response.article.favoritesCount,
            favorited: response.article.favorited,
          };
        })
      );
  }

  unfavoriteArticle(
    slug: string
  ): Observable<{ favoritesCount: number; favorited: boolean }> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .delete<ArticleApiResponse>(this.endpoint + slug + '/favorites', {
        headers,
      })
      .pipe(
        map((response) => {
          return {
            favoritesCount: response.article.favoritesCount,
            favorited: response.article.favorited,
          };
        })
      );
  }
}
