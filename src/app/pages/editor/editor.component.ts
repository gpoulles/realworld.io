import { Component } from '@angular/core';
import { EditorFormComponent } from './editor-form/editor-form.component';

@Component({
  selector: 'conduit-editor',
  standalone: true,
  imports: [EditorFormComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {}
