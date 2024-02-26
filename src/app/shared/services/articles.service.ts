import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article, Articles } from '../interfaces/article.interface';
import { map, Observable } from 'rxjs';
import { ARTICLES_PER_PAGE } from '../constants/api.constant';
import {
  ArticleApiResponse,
  ArticlesApiResponse,
} from '../interfaces/article-api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(offset = 0): Observable<Articles> {
    const params = new HttpParams()
      .append('limit', ARTICLES_PER_PAGE.toString())
      .append('offset', offset.toString());
    return this.http
      .get<ArticlesApiResponse>(environment.endpointDomain + 'articles', {
        params,
      })
      .pipe(
        map((response: ArticlesApiResponse) =>
          this.mapArticlesResponse(response)
        )
      );
  }

  getArticle(slug: string): Observable<Article> {
    return this.http
      .get<ArticleApiResponse>(environment.endpointDomain + 'articles/' + slug)
      .pipe(
        map((response: ArticleApiResponse) => {
          return this.mapArticleResponse(response.article);
        })
      );
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
      },
    };
  }
}
