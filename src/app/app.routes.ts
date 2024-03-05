import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticleComponent } from './pages/article/article.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { authenticationGuard } from './shared/guards/authentication.guard';
import { EditorComponent } from './pages/editor/editor.component';
import { EditorArticleComponent } from './pages/editor/editor-article/editor-article.component';
import { isAuthorGuard } from './shared/guards/isAuthor.guard';
import { resetArticleGuard } from './shared/guards/resetArticle.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    canDeactivate: [resetArticleGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'editor/:slug',
    component: EditorArticleComponent,
    canActivate: [authenticationGuard, isAuthorGuard],
    canDeactivate: [resetArticleGuard],
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authenticationGuard],
  },
];
