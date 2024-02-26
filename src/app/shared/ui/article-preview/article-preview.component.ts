import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { RouterLink } from '@angular/router';
import { MetaDataSnippetComponent } from '../meta-data-snippet/meta-data-snippet.component';
import { TagsComponent } from '../tags/tags.component';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'conduit-article-preview',
  standalone: true,
  imports: [
    RouterLink,
    MetaDataSnippetComponent,
    TagsComponent,
    FavoritesComponent,
  ],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  @Input() article: Article | undefined = undefined;
}
