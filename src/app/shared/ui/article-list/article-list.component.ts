import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
  selector: 'conduit-article-list',
  standalone: true,
  imports: [ArticlePreviewComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];
}
