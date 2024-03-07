import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'conduit-article-base',
  standalone: true,
  imports: [],
  templateUrl: './article-base.component.html',
  styleUrl: './article-base.component.scss',
})
export class ArticleBaseComponent implements OnInit {
  article: Article | null = null;
  loadingArticle = false;

  constructor(
    protected articlesService: ArticlesService,
    protected route: ActivatedRoute
  ) {
    this.articlesService.currentArticle$.subscribe((article) => {
      this.article = article;
    });
  }
  ngOnInit() {
    this.loadArticle();
  }

  private loadArticle(): void {
    if (this.article === null) {
      this.articlesService
        .getArticle(this.route.snapshot.params['slug'])
        .pipe(
          tap({
            subscribe: () => (this.loadingArticle = true),
            finalize: () => (this.loadingArticle = false),
          })
        )
        .subscribe({
          next: (response) => (this.article = response),
          error: (error) => console.log(error),
        });
    }
  }
}
