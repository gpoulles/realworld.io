import { Component } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesApiFilters } from '../../interfaces/article-api.interface';
import { tap } from 'rxjs';
import { Articles } from '../../interfaces/article.interface';
import { ARTICLES_PER_PAGE } from '../../constants/api.constant';

@Component({
  selector: 'conduit-articles-base',
  standalone: true,
  imports: [],
  templateUrl: './articles-base.component.html',
  styleUrl: './articles-base.component.scss',
})
export class ArticlesBaseComponent {
  loadingArticles = false;
  filters: ArticlesApiFilters = { offset: 0 };
  articlesResponse: Articles = { articles: [], articlesCount: 0 };
  constructor(protected articlesService: ArticlesService) {}

  loadArticles(filters: ArticlesApiFilters) {
    this.filters = filters;
    this.articlesService
      .getArticles(filters)
      .pipe(
        tap({
          subscribe: () => (this.loadingArticles = true),
          finalize: () => (this.loadingArticles = false),
        })
      )
      .subscribe({
        next: (response) => {
          this.articlesResponse = response;
        },
        error: (error) => console.log(error),
      });
  }

  switchPage(page: number) {
    this.loadArticles({
      ...this.filters,
      offset: (page - 1) * ARTICLES_PER_PAGE,
    });
  }

  getCurrentPage(): number {
    return this.filters.offset / ARTICLES_PER_PAGE + 1;
  }

  getTotalPages(): number {
    return Math.ceil(this.articlesResponse.articlesCount / ARTICLES_PER_PAGE);
  }
}
