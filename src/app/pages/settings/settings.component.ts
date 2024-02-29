import { Component } from '@angular/core';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserUpdateApiDto } from '../../shared/interfaces/users-api.interface';
import { ErrorResponse } from '../../shared/interfaces/error.interface';
import { LoginFormComponent } from '../login/login-form/login-form.component';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';

@Component({
  selector: 'conduit-settings',
  standalone: true,
  imports: [SettingsFormComponent, LoginFormComponent, ErrorMessagesComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  errorMessages: string[] = [];
  constructor(public readonly usersService: UsersService) {}

  saveChanges(payload: UserUpdateApiDto) {
    this.usersService.updateCurrentUser(payload).subscribe({
      next: () => {},
      error: (error: ErrorResponse) => {
        this.errorMessages = error.error.errorMessages || [
          'An unexpected error occurred.',
        ];
      },
    });
  }

  logout() {
    this.usersService.logout();
  }
}
