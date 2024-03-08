import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../shared/services/articles.service';
import { MetaDataSnippetComponent } from '../../shared/ui/meta-data-snippet/meta-data-snippet.component';
import { TagsComponent } from '../../shared/ui/tags/tags.component';
import { FavoriteButtonComponent } from '../../shared/ui/favorite-button/favorite-button.component';
import { EditArticleComponent } from '../../shared/ui/edit-article/edit-article.component';
import { DeleteArticleComponent } from '../../shared/ui/delete-article/delete-article.component';
import { ArticleBaseComponent } from '../../shared/components/article-base/article-base.component';
import { FollowUserComponent } from '../../shared/components/follow-user/follow-user.component';
import { FavoriteArticleComponent } from '../../shared/components/favorite-article/favorite-article.component';
import { takeUntil } from 'rxjs';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'conduit-article',
  standalone: true,
  imports: [
    MetaDataSnippetComponent,
    TagsComponent,
    FavoriteButtonComponent,
    RouterLink,
    EditArticleComponent,
    DeleteArticleComponent,
    FollowUserComponent,
    FavoriteArticleComponent,
    MarkdownComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent extends ArticleBaseComponent {
  constructor(
    protected override route: ActivatedRoute,
    protected override articlesService: ArticlesService,
    public readonly router: Router
  ) {
    super(articlesService, route);
  }

  deleteArticle() {
    if (this.article)
      this.articlesService
        .deleteArticle(this.article?.slug)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (error) => console.error(error),
        });
  }
}
