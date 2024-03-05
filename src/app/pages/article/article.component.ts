import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../shared/services/articles.service';
import { MetaDataSnippetComponent } from '../../shared/ui/meta-data-snippet/meta-data-snippet.component';
import { TagsComponent } from '../../shared/ui/tags/tags.component';
import { FavoritesComponent } from '../../shared/ui/favorites/favorites.component';
import { EditArticleComponent } from '../../shared/ui/edit-article/edit-article.component';
import { DeleteArticleComponent } from '../../shared/ui/delete-article/delete-article.component';
import { ArticleBaseComponent } from '../../shared/components/article-base/article-base.component';

@Component({
  selector: 'conduit-article',
  standalone: true,
  imports: [
    MetaDataSnippetComponent,
    TagsComponent,
    FavoritesComponent,
    RouterLink,
    EditArticleComponent,
    DeleteArticleComponent,
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
      this.articlesService.deleteArticle(this.article?.slug).subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => console.log(error),
      });
  }
}
