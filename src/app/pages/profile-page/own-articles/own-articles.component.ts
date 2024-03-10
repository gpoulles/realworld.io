import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../shared/services/articles.service';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ArticleListComponent } from '../../../shared/ui/article-list/article-list.component';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { ArticlesBaseComponent } from '../../../shared/components/articles-base/articles-base.component';
@Component({
  selector: 'conduit-own-articles',
  standalone: true,
  imports: [ArticleListComponent, PaginationComponent],
  templateUrl: './own-articles.component.html',
  styleUrl: './own-articles.component.scss',
})
export class OwnArticlesComponent
  extends ArticlesBaseComponent
  implements OnInit
{
  constructor(
    protected override articlesService: ArticlesService,
    private readonly route: ActivatedRoute
  ) {
    super(articlesService);
  }
  ngOnInit() {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(({ profile }) => {
      this.filters = { ...this.filters, author: profile.name };
      this.loadArticles(this.filters);
    });
  }
}
