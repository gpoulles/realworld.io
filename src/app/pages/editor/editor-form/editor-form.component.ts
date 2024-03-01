import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Article } from '../../../shared/interfaces/article.interface';
import { ErrorMessagesComponent } from '../../../shared/ui/error-messages/error-messages.component';

@Component({
  selector: 'conduit-editor-form',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessagesComponent],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss',
})
export class EditorFormComponent implements OnInit {
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @Input() article: Article | undefined = undefined;
  articleForm!: FormGroup;

  ngOnInit() {
    this.articleForm = new FormGroup({
      title: new FormControl<string>('', [Validators.required]),
      description: new FormControl<string>('', [Validators.required]),
      body: new FormControl<string>('', [Validators.required]),
      tag: new FormControl<string>(''),
      tagList: new FormControl<string[]>([]),
    });
  }

  submit() {
    if (this.articleForm.valid) this.submitted.emit(this.articleForm.value);
  }

  addTag() {
    this.articleForm.controls['tagList'].setValue([
      ...this.articleForm.controls['tagList'].value,
      this.articleForm.controls['tag'].value,
    ]);
    this.articleForm.controls['tag'].setValue('');
  }
}
