import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { BasicArticleApiResponse } from '../interfaces/article-api.interface';
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleMapperService {
  constructor(private usersService: UsersService) {}

  mapArticleResponse(article: BasicArticleApiResponse): Article {
    const user = this.usersService.currentUser();
    return {
      slug: article.slug,
      title: article.title,
      body: article.body,
      excerpt: article.description,
      tags: article.tagList,
      favorites: article.favoritesCount,
      favorited: article.favorited,
      publishedDate: new Date(article.createdAt),
      author: {
        name: article.author.username,
        image: article.author.image,
        ownUser: article.author.username === user?.username,
        following: article.author.following,
      },
    };
  }
}
