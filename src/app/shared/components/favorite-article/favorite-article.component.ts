import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FavoriteButtonComponent } from '../../ui/favorite-button/favorite-button.component';
import { Article } from '../../interfaces/article.interface';
import { FavoritesService } from '../../services/favorites.service';
import { Subject, takeUntil } from 'rxjs';
import { ArticlesService } from '../../services/articles.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'conduit-favorite-article',
  standalone: true,
  imports: [FavoriteButtonComponent],
  templateUrl: './favorite-article.component.html',
  styleUrl: './favorite-article.component.scss',
})
export class FavoriteArticleComponent implements OnDestroy {
  @Input({ required: true }) article: Article | undefined;
  @Output() articleChange: EventEmitter<Article> = new EventEmitter<Article>();
  @Input() onArticle = false;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly articlesService: ArticlesService,
    private readonly usersService: UsersService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  favorited() {
    if (this.usersService.currentUser()) {
      if (this.article?.favorited) {
        this.favoritesService
          .unfavoriteArticle(this.article.slug)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              this.articleChange.emit(response);
              if (this.onArticle)
                this.articlesService.currentArticle$.next(response);
            },
            error: (error) => console.error(error),
          });
      } else {
        if (this.article?.slug) {
          this.favoritesService
            .favoriteArticle(this.article.slug)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (response) => {
                this.articleChange.emit(response);
                if (this.onArticle)
                  this.articlesService.currentArticle$.next(response);
              },
              error: (error) => console.error(error),
            });
        }
      }
    }
  }
}
