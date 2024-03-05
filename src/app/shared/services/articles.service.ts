import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article, Articles } from '../interfaces/article.interface';
import { map, Observable } from 'rxjs';
import { ARTICLES_PER_PAGE } from '../constants/api.constant';
import {
  ArticleApiDto,
  ArticleApiResponse,
  ArticlesApiFilters,
  ArticlesApiResponse,
} from '../interfaces/article-api.interface';
import { environment } from '../../../environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  currentArticle = signal<Article | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly usersService: UsersService
  ) {}

  getArticles(filters: ArticlesApiFilters): Observable<Articles> {
    let params = new HttpParams().append('limit', ARTICLES_PER_PAGE.toString());

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
      })
      .pipe(
        map((response: ArticlesApiResponse) =>
          this.mapArticlesResponse(response)
        )
      );
  }

  getArticle(slug: string): Observable<Article> {
    return this.http.get<ArticleApiResponse>(this.generateEndpoint(slug)).pipe(
      map((response: ArticleApiResponse) => {
        const article = this.mapArticleResponse(response.article);
        this.currentArticle.set(article);
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
          return this.mapArticleResponse(response.article);
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
          this.currentArticle.set(this.mapArticleResponse(response.article));
          return this.mapArticleResponse(response.article);
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
        this.mapArticleResponse(article)
      ),
      articlesCount: response.articlesCount,
    };
  }

  private mapArticleResponse(article: ArticleApiResponse): Article {
    const user = this.usersService.currentUser();
    return {
      slug: article.slug,
      title: article.title,
      body: article.body,
      excerpt: article.description,
      tags: article.tagList,
      favorites: article.favoritesCount,
      publishedDate: new Date(article.createdAt),
      author: {
        name: article.author.username,
        picture: article.author.image,
        ownUser: article.author.username === user?.username,
      },
    };
  }

  private generateEndpoint(slug?: string): string {
    const appendix = slug ? '/' + slug : '';
    return environment.endpointDomain + 'articles' + appendix;
  }
}
