import { Component, Input } from '@angular/core';
import { Author } from '../../interfaces/article.interface';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'conduit-meta-data-snippet',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './meta-data-snippet.component.html',
  styleUrl: './meta-data-snippet.component.scss',
})
export class MetaDataSnippetComponent {
  @Input({ required: true }) author: Author | undefined;
  @Input() publicationDate: Date = new Date();
}
