import { Component } from '@angular/core';
import { ArticleListComponent } from '../../../shared/ui/article-list/article-list.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { ArticlesBaseComponent } from '../../../shared/components/articles-base/articles-base.component';
import { ArticlesService } from '../../../shared/services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'conduit-favorited-articles',
  standalone: true,
  imports: [ArticleListComponent, PaginationComponent],
  templateUrl: './favorited-articles.component.html',
  styleUrl: './favorited-articles.component.scss',
})
export class FavoritedArticlesComponent extends ArticlesBaseComponent {
  constructor(
    protected override articlesService: ArticlesService,
    private readonly route: ActivatedRoute
  ) {
    super(articlesService);
    this.route.parent?.data
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ profile }) => {
        this.filters = { ...this.filters, favorited: profile.name };
        this.loadArticles(this.filters);
      });
  }
}
