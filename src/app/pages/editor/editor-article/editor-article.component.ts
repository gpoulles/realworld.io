import { Component, OnInit } from '@angular/core';
import { EditorFormComponent } from '../editor-form/editor-form.component';
import { ArticleApiDto } from '../../../shared/interfaces/article-api.interface';
import { tap } from 'rxjs';
import { ArticlesService } from '../../../shared/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../shared/interfaces/article.interface';

@Component({
  selector: 'conduit-editor-article',
  standalone: true,
  imports: [EditorFormComponent],
  templateUrl: './editor-article.component.html',
  styleUrl: './editor-article.component.scss',
})
export class EditorArticleComponent implements OnInit {
  article: Article | undefined;
  loadingArticle: boolean = false;
  errorMessages: string[] = [];

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit() {
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
  saveChanges(payload: ArticleApiDto) {
    if (this.article)
      this.articlesService.updateArticle(this.article.slug, payload).subscribe({
        next: (article) => {
          this.router.navigate(['/article', article.slug]);
        },
        error: (error) => (this.errorMessages = error.error.errorMessages),
      });
  }
}
