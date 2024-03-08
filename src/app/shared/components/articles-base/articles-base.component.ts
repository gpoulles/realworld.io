import { Component, OnDestroy } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { ArticlesApiFilters } from '../../interfaces/article-api.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { Articles } from '../../interfaces/article.interface';
import { ARTICLES_PER_PAGE } from '../../constants/api.constant';

@Component({
  selector: 'conduit-articles-base',
  standalone: true,
  imports: [],
  templateUrl: './articles-base.component.html',
  styleUrl: './articles-base.component.scss',
})
export class ArticlesBaseComponent implements OnDestroy {
  loadingArticles = false;
  filters: ArticlesApiFilters = { offset: 0 };
  articlesResponse: Articles = { articles: [], articlesCount: 0 };
  destroy$ = new Subject<void>();
  constructor(protected articlesService: ArticlesService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadArticles(filters: ArticlesApiFilters) {
    this.filters = filters;
    this.articlesService
      .getArticles(filters)
      .pipe(
        takeUntil(this.destroy$),
        tap({
          subscribe: () => (this.loadingArticles = true),
          finalize: () => (this.loadingArticles = false),
        })
      )
      .subscribe({
        next: (response) => {
          this.articlesResponse = response;
        },
        error: (error) => console.error(error),
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
