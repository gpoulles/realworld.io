import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ArticleApiResponse } from '../interfaces/article-api.interface';
import { Article } from '../interfaces/article.interface';
import { ArticlesService } from './articles.service';
import { ArticleMapperService } from './article-mapper.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private readonly http: HttpClient,
    private readonly articlesService: ArticlesService,
    private readonly articleMapperService: ArticleMapperService
  ) {}

  favoriteArticle(slug: string): Observable<Article> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .post<ArticleApiResponse>(this.generateEndpoint(slug), {}, { headers })
      .pipe(
        map((response: ArticleApiResponse) => {
          const article = this.articleMapperService.mapArticleResponse(
            response.article
          );
          this.articlesService.currentArticle$.next(article);
          return article;
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
          const article = this.articleMapperService.mapArticleResponse(
            response.article
          );
          this.articlesService.currentArticle$.next(article);
          return article;
        })
      );
  }

  private generateEndpoint(slug: string): string {
    return environment.endpointDomain + 'articles/' + slug + '/favorite';
  }
}
