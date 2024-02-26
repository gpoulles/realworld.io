import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/article.interface';

@Component({
  selector: 'conduit-article-preview',
  standalone: true,
  imports: [],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  @Input() article: Article | undefined = undefined;
}
