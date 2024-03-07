import { Component, Input, OnDestroy } from '@angular/core';
import { FavoriteButtonComponent } from '../../ui/favorite-button/favorite-button.component';
import { Article } from '../../interfaces/article.interface';
import { FavoritesService } from '../../services/favorites.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'conduit-favorite-article',
  standalone: true,
  imports: [FavoriteButtonComponent],
  templateUrl: './favorite-article.component.html',
  styleUrl: './favorite-article.component.scss',
})
export class FavoriteArticleComponent implements OnDestroy {
  @Input() article: Article | null = null;
  @Input() extended = false;

  destroy$ = new Subject<void>();

  constructor(private readonly favoritesService: FavoritesService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  favorited() {
    if (this.article?.favorited) {
      this.favoritesService
        .unfavoriteArticle(this.article.slug)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    } else {
      if (this.article?.slug) {
        this.favoritesService
          .favoriteArticle(this.article.slug)
          .pipe(takeUntil(this.destroy$))
          .subscribe();
      }
    }
  }
}
