import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article, Articles } from '../interfaces/article.interface';
import { map, Observable, Subject } from 'rxjs';
import { ARTICLES_PER_PAGE } from '../constants/api.constant';
import {
  ArticleApiDto,
  ArticleApiResponse,
  ArticlesApiFilters,
  ArticlesApiResponse,
} from '../interfaces/article-api.interface';
import { environment } from '../../../environments/environment';
import { ArticleMapperService } from './article-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  currentArticle$ = new Subject<Article | null>();

  constructor(
    private readonly http: HttpClient,
    private readonly articleMapperService: ArticleMapperService
  ) {}

  getArticles(filters: ArticlesApiFilters): Observable<Articles> {
    let params = new HttpParams().append('limit', ARTICLES_PER_PAGE.toString());
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    Object.keys(filters).forEach((key: string) => {
      const propertyKey = key as keyof ArticlesApiFilters;
      if (filters[propertyKey] !== null && filters[propertyKey] !== undefined) {
        params = params.append(
          propertyKey,
          filters[propertyKey]?.toString() ?? ''
        );
      }
    });

    return this.http
      .get<ArticlesApiResponse>(this.generateEndpoint(), {
        params,
        headers,
      })
      .pipe(
        map((response: ArticlesApiResponse) =>
          this.mapArticlesResponse(response)
        )
      );
  }

  getArticle(slug: string): Observable<Article> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .get<ArticleApiResponse>(this.generateEndpoint(slug), { headers })
      .pipe(
        map((response: ArticleApiResponse) => {
          const article = this.articleMapperService.mapArticleResponse(
            response.article
          );
          this.currentArticle$.next(article);
          return article;
        })
      );
  }

  createArticle(article: ArticleApiDto): Observable<Article> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .post<ArticleApiResponse>(this.generateEndpoint(), article, {
        headers,
      })
      .pipe(
        map((response: ArticleApiResponse) => {
          return this.articleMapperService.mapArticleResponse(response.article);
        })
      );
  }

  updateArticle(slug: string, article: ArticleApiDto): Observable<Article> {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http
      .put<ArticleApiResponse>(this.generateEndpoint(slug), article, {
        headers,
      })
      .pipe(
        map((response: ArticleApiResponse) => {
          this.currentArticle$.next(
            this.articleMapperService.mapArticleResponse(response.article)
          );
          return this.articleMapperService.mapArticleResponse(response.article);
        })
      );
  }

  deleteArticle(slug: string) {
    const headers = new HttpHeaders().set('addAuthToken', 'true');
    return this.http.delete<void>(this.generateEndpoint(slug), {
      headers,
    });
  }

  private mapArticlesResponse(response: ArticlesApiResponse): Articles {
    return {
      articles: response.articles.map((article) =>
        this.articleMapperService.mapArticleResponse(article)
      ),
      articlesCount: response.articlesCount,
    };
  }

  private generateEndpoint(slug?: string): string {
    const appendix = slug ? '/' + slug : '';
    return environment.endpointDomain + 'articles' + appendix;
  }
}
