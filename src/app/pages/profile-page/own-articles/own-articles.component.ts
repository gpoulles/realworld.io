import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticlesService } from '../../../shared/services/articles.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ARTICLES_PER_PAGE } from '../../../shared/constants/api.constant';
import { ArticlesApiFilters } from '../../../shared/interfaces/article-api.interface';
import { Articles } from '../../../shared/interfaces/article.interface';
import { ActivatedRoute } from '@angular/router';
import { ArticleListComponent } from '../../../shared/ui/article-list/article-list.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
@Component({
  selector: 'conduit-own-articles',
  standalone: true,
  imports: [ArticleListComponent, PaginationComponent],
  templateUrl: './own-articles.component.html',
  styleUrl: './own-articles.component.scss',
})
export class OwnArticlesComponent implements OnInit, OnDestroy {
  filters: ArticlesApiFilters = {
    offset: 0,
  };
  articlesResponse: Articles = { articles: [], articlesCount: 0 };
  loadingArticles: boolean = false;
  destroy$ = new Subject<void>();

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(({ profile }) => {
      this.filters = { ...this.filters, author: profile.name };
      this.loadArticles(this.filters);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  switchPage(page: number) {
    this.filters = {
      ...this.filters,
      offset: (page - 1) * ARTICLES_PER_PAGE,
    };
    this.loadArticles(this.filters);
  }

  getCurrentPage(): number {
    return this.filters.offset / ARTICLES_PER_PAGE + 1;
  }

  getTotalPages(): number {
    return Math.ceil(this.articlesResponse.articlesCount / ARTICLES_PER_PAGE);
  }

  private loadArticles(filters: ArticlesApiFilters) {
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
        error: (error) => console.log(error),
      });
  }
}
