import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'conduit-edit-article',
  standalone: true,
  imports: [],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent {
  @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
}
