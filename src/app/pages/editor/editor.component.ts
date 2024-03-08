import { Component, OnDestroy } from '@angular/core';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';
import { ArticleApiDto } from '../../shared/interfaces/article-api.interface';
import { ArticlesService } from '../../shared/services/articles.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'conduit-editor',
  standalone: true,
  imports: [EditorFormComponent, ErrorMessagesComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent implements OnDestroy {
  errorMessages: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private readonly articlesService: ArticlesService,
    private readonly router: Router
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  saveChanges(payload: ArticleApiDto) {
    this.articlesService
      .createArticle(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (article) => {
          this.router.navigate(['/article', article.slug]);
        },
        error: (error) => (this.errorMessages = error.error.errorMessages),
      });
  }
}
