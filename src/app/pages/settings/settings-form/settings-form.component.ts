import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  User,
  UserUpdateApiDto,
} from '../../../shared/interfaces/users-api.interface';

@Component({
  selector: 'conduit-settings-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './settings-form.component.html',
  styleUrl: './settings-form.component.scss',
})
export class SettingsFormComponent implements OnInit, OnChanges {
  @Input() currentUser: User | null = null;
  @Output() submitted: EventEmitter<UserUpdateApiDto> =
    new EventEmitter<UserUpdateApiDto>();
  settingsForm!: FormGroup;

  ngOnInit() {
    console.log(this.currentUser);
    this.settingsForm = new FormGroup({
      username: new FormControl<string>(this.currentUser?.username ?? '', [
        Validators.required,
      ]),
      email: new FormControl<string>(this.currentUser?.email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>(''),
      image: new FormControl<string>(this.currentUser?.image ?? '', [
        Validators.required,
      ]),
      bio: new FormControl<string>(this.currentUser?.bio ?? '', [
        Validators.required,
      ]),
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
