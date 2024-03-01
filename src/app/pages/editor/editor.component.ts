import { Component } from '@angular/core';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';
import { ArticleApiDto } from '../../shared/interfaces/article-api.interface';

@Component({
  selector: 'conduit-editor',
  standalone: true,
  imports: [EditorFormComponent, ErrorMessagesComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {
  saveChanges(articleDto: ArticleApiDto) {
    console.log(articleDto);
  }
}
