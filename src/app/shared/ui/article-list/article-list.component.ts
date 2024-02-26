import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'conduit-article-list',
  standalone: true,
  imports: [],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  @Input() articles: Article[] = [];
}
