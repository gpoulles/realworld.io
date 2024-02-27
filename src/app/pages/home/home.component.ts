import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../shared/services/articles.service';
import { ArticlePreviewComponent } from '../../shared/ui/article-preview/article-preview.component';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { ARTICLES_PER_PAGE } from '../../shared/constants/api.constant';
import { tap } from 'rxjs';
import { ArticleListComponent } from '../../shared/ui/article-list/article-list.component';
import { Articles } from '../../shared/interfaces/article.interface';
import { PopularTagsComponent } from './popular-tags/popular-tags.component';

@Component({
  selector: 'conduit-home',
  standalone: true,
  imports: [
    ArticlePreviewComponent,
    PaginationComponent,
    ArticleListComponent,
    PopularTagsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loadingArticles = false;
  articlesResponse: Articles = { articles: [], articlesCount: 0 };
  offset: number = 0;

  constructor(private readonly articlesService: ArticlesService) {}

  ngOnInit() {
    this.loadArticles();
  }

  switchPage(page: number) {
    this.offset = (page - 1) * ARTICLES_PER_PAGE;
    this.loadArticles();
  }

  loadArticlesByTag(tag: string) {
    console.log(tag);
  }

  getCurrentPage(): number {
    return this.offset / ARTICLES_PER_PAGE + 1;
  }

  getTotalPages(): number {
    return Math.ceil(this.articlesResponse.articlesCount / ARTICLES_PER_PAGE);
  }

  private loadArticles() {
    this.articlesService
      .getArticles(this.offset)
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
}
