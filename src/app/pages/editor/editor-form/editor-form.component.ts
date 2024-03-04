import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Article } from '../../../shared/interfaces/article.interface';
import { ErrorMessagesComponent } from '../../../shared/ui/error-messages/error-messages.component';
import { ArticleApiDto } from '../../../shared/interfaces/article-api.interface';

@Component({
  selector: 'conduit-editor-form',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMessagesComponent],
  templateUrl: './editor-form.component.html',
  styleUrl: './editor-form.component.scss',
})
export class EditorFormComponent implements OnChanges {
  @Output() submitted: EventEmitter<ArticleApiDto> =
    new EventEmitter<ArticleApiDto>();
  @Input() article: Article | undefined;
  articleForm!: FormGroup;

  constructor() {
    this.articleForm = new FormGroup({
      title: new FormControl<string>(this.article?.title ?? '', [
        Validators.required,
      ]),
      description: new FormControl<string>(this.article?.excerpt ?? '', [
        Validators.required,
      ]),
      body: new FormControl<string>(this.article?.body ?? '', [
        Validators.required,
      ]),
      tag: new FormControl<string>(''),
      tagList: new FormControl<string[]>(this.article?.tags ?? []),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'] && changes['article'].currentValue) {
      this.updateForm(changes['article'].currentValue);
    }
  }

  submit() {
    if (this.articleForm.valid)
      this.submitted.emit({ article: this.articleForm.value });
  }

  addTag() {
    this.articleForm.controls['tagList'].setValue([
      ...this.articleForm.controls['tagList'].value,
      this.articleForm.controls['tag'].value,
    ]);
    this.articleForm.controls['tag'].setValue('');
  }

  updateForm(article: Article): void {
    this.articleForm.patchValue({
      title: article.title,
      description: article.excerpt,
      body: article.body,
      tagList: article.tags,
    });
  }
}
