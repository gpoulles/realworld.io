import { Component } from '@angular/core';
import { EditorFormComponent } from '../editor-form/editor-form.component';

@Component({
  selector: 'conduit-editor-article',
  standalone: true,
  imports: [EditorFormComponent],
  templateUrl: './editor-article.component.html',
  styleUrl: './editor-article.component.scss',
})
export class EditorArticleComponent {}
