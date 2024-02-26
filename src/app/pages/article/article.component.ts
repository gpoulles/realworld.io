import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../shared/services/articles.service';
import { MetaDataSnippetComponent } from '../../shared/ui/meta-data-snippet/meta-data-snippet.component';
import { Article } from '../../shared/interfaces/article.interface';
import { tap } from 'rxjs';
import { TagsComponent } from '../../shared/ui/tags/tags.component';

@Component({
  selector: 'conduit-article',
  standalone: true,
  imports: [MetaDataSnippetComponent, TagsComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit {
  article: Article | undefined = undefined;
  loadingArticle = false;
  constructor(
    private readonly route: ActivatedRoute,
    private readonly articlesService: ArticlesService
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
}
