import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingsApiDto } from '../../../shared/interfaces/settings-api.interface';

@Component({
  selector: 'conduit-settings-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnInit {
  @Output() submitted: EventEmitter<SettingsApiDto> =
    new EventEmitter<SettingsApiDto>();
  settingsForm!: FormGroup;

  ngOnInit() {
    this.settingsForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
      image: new FormControl<string>('', [Validators.required]),
      bio: new FormControl<string>('', [Validators.required]),
    });
  }

  submit() {
    if (this.settingsForm.valid) this.submitted.emit(this.settingsForm?.value);
  }
}
