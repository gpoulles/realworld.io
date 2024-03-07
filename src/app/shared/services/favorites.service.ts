import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticleApiResponse } from '../interfaces/article-api.interface';
import { Article } from '../interfaces/article.interface';
import { ArticleMapperService } from './article-mapper.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private readonly http: HttpClient,
    private readonly articleMapperService: ArticleMapperService
  ) {}

  favoriteArticle(slug: string): Observable<Article> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .post<ArticleApiResponse>(this.generateEndpoint(slug), {}, { headers })
      .pipe(
        map((response: ArticleApiResponse) => {
          return this.articleMapperService.mapArticleResponse(response.article);
        })
      );
  }

  unfavoriteArticle(slug: string): Observable<Article> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .delete<ArticleApiResponse>(this.generateEndpoint(slug), {
        headers,
      })
      .pipe(
        map((response: ArticleApiResponse) => {
          return this.articleMapperService.mapArticleResponse(response.article);
        })
      );
  }

  private generateEndpoint(slug: string): string {
    return environment.endpointDomain + 'articles/' + slug + '/favorite';
  }
}
