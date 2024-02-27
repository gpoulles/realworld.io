import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.service';
import { ArticlePreviewComponent } from '../../shared/ui/article-preview/article-preview.component';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { ARTICLES_PER_PAGE } from '../../shared/constants/api.constant';
import { tap } from 'rxjs';
import { ArticleListComponent } from '../../shared/ui/article-list/article-list.component';
import { Articles } from '../../shared/interfaces/article.interface';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';
import { TagsService } from '../../shared/services/tags.service';
import { TabNavBarItem } from '../../shared/interfaces/tab-nav-bar.interface';
import { TabNavBarComponent } from '../../shared/ui/tab-nav-bar/tab-nav-bar.component';
import { ArticlesApiFilters } from '../../shared/interfaces/article-api.interface';
import { TabNavBarType } from '../../shared/enums/tab-nav-bar-type.enum';

@Component({
  selector: 'conduit-home',
  standalone: true,
  imports: [
    ArticlePreviewComponent,
    PaginationComponent,
    ArticleListComponent,
    PopularTagsComponent,
    TabNavBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loadingArticles = false;
  loadingTags = false;

  articlesResponse: Articles = { articles: [], articlesCount: 0 };
  tagsResponse: string[] = [];

  filters: ArticlesApiFilters = { offset: 0 };

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly tagsService: TagsService
  ) {}

  ngOnInit() {
    this.loadArticles(this.filters);
    this.loadTags();
  }

  switchPage(page: number) {
    this.loadArticles({
      ...this.filters,
      offset: (page - 1) * ARTICLES_PER_PAGE,
    });
  }

  loadArticlesByTag(tag: string) {
    this.loadArticles({ ...this.filters, tag });
  }

  tabNavbarItemSelected(tabNavBarItem: TabNavBarItem) {
    if (tabNavBarItem.type !== TabNavBarType.TAG) {
      this.loadArticles({
        offset: 0,
      });
    }
  }

  getCurrentPage(): number {
    return this.filters.offset / ARTICLES_PER_PAGE + 1;
  }

  getTotalPages(): number {
    return Math.ceil(this.articlesResponse.articlesCount / ARTICLES_PER_PAGE);
  }

  private loadArticles(filters: ArticlesApiFilters) {
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

  private loadTags() {
    this.tagsService
      .getTags()
      .pipe(
        tap({
          subscribe: () => (this.loadingTags = true),
          finalize: () => (this.loadingTags = false),
        })
      )
      .subscribe({
        next: (response) => {
          this.tagsResponse = response;
        },
        error: (error) => console.log(error),
      });
  }
}
