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

import { UserUpdateApiDto } from '../../../shared/interfaces/users-api.interface';
import { User } from '../../../shared/interfaces/users.interface';

@Component({
  selector: 'conduit-settings-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnChanges {
  @Input() currentUser: User | null = null;
  @Output() submitted: EventEmitter<UserUpdateApiDto> =
    new EventEmitter<UserUpdateApiDto>();
  settingsForm: FormGroup;

  constructor() {
    this.settingsForm = new FormGroup({
      username: new FormControl<string>(this.currentUser?.username ?? '', [
        Validators.required,
      ]),
      email: new FormControl<string>(this.currentUser?.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>(''),
      image: new FormControl<string>(this.currentUser?.image ?? ''),
      bio: new FormControl<string>(this.currentUser?.bio ?? ''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUser'] && changes['currentUser'].currentValue) {
      this.updateForm(changes['currentUser'].currentValue);
    }
  }

  submit() {
    if (this.settingsForm.valid)
      this.submitted.emit({ user: this.settingsForm.value });
  }

  updateForm(user: User): void {
    this.settingsForm.patchValue({
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image,
    });
  }
}
