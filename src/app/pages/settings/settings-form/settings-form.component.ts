import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserUpdateApiDto } from '../../../shared/interfaces/users-api.interface';

@Component({
  selector: 'conduit-settings-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnInit {
  @Output() submitted: EventEmitter<UserUpdateApiDto> =
    new EventEmitter<UserUpdateApiDto>();
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
    if (this.settingsForm.valid)
      this.submitted.emit({ user: this.settingsForm.value });
  }
}
