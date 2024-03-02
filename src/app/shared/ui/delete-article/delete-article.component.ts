import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'conduit-delete-article',
  standalone: true,
  imports: [],
  templateUrl: './delete-article.component.html',
  styleUrl: './delete-article.component.scss',
})
export class DeleteArticleComponent {
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
}
