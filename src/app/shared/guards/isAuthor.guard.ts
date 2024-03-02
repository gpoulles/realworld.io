import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ArticlesService } from '../services/articles.service';

export const isAuthorGuard: CanActivateFn = () => {
  return (
    inject(UsersService).currentUser()?.username ===
    inject(ArticlesService).currentArticle()?.author.name
  );
};
