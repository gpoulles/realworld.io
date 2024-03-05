import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ArticlesService } from '../services/articles.service';
import { map, switchMap, tap } from 'rxjs';

export const isAuthorGuard: CanActivateFn = (next: ActivatedRouteSnapshot) => {
  const usersService = inject(UsersService);
  const articlesService = inject(ArticlesService);
  const router = inject(Router);
  return usersService.getCurrentUser().pipe(
    switchMap((user) =>
      articlesService.getArticle(next.params['slug']).pipe(
        map((article) => {
          return article.author.name === user.username;
        }),
        tap((isAuthor) => {
          if (!isAuthor) {
            router.navigate(['/']);
          }
        }),
        map((isAuthor) => isAuthor)
      )
    )
  );
};
