import { Component, Input } from '@angular/core';
import { Author } from '../../interfaces/article.interface';

@Component({
  selector: 'conduit-meta-data-snippet',
  standalone: true,
  imports: [],
  templateUrl: './meta-data-snippet.component.html',
  styleUrl: './meta-data-snippet.component.scss',
})
export class MetaDataSnippetComponent {
  @Input() author: Author | undefined = undefined;
  @Input() publicationDate: Date = new Date();
}
