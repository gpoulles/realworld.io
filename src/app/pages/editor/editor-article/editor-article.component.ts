import { Component } from '@angular/core';
import { EditorFormComponent } from '../editor-form/editor-form.component';
import { ArticleApiDto } from '../../../shared/interfaces/article-api.interface';
import { ArticlesService } from '../../../shared/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleBaseComponent } from '../../../shared/components/article-base/article-base.component';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'conduit-editor-article',
  standalone: true,
  imports: [EditorFormComponent],
  templateUrl: './editor-article.component.html',
  styleUrl: './editor-article.component.scss',
})
export class EditorArticleComponent extends ArticleBaseComponent {
  errorMessages: string[] = [];

  constructor(
    protected override articlesService: ArticlesService,
    protected override route: ActivatedRoute,
    private readonly router: Router
  ) {
    super(articlesService, route);
  }

  saveChanges(payload: ArticleApiDto) {
    if (this.article)
      this.articlesService
        .updateArticle(this.article.slug, payload)
        .pipe(
          takeUntil(this.destroy$),
          tap({ subscribe: () => (this.errorMessages = []) })
        )
        .subscribe({
          next: (article) => {
            this.router.navigate(['/article', article.slug]);
          },
          error: (error) => (this.errorMessages = error.error.errorMessages),
        });
  }
}
