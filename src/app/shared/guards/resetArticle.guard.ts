import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { inject } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}

export const resetArticleGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component: CanComponentDeactivate,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  if (
    !nextState.url.startsWith('/article/') &&
    !nextState.url.startsWith('/editor/')
  ) {
    inject(ArticlesService).currentArticle$.next(null);
  }
  return component.canDeactivate ? component.canDeactivate() : true;
};
