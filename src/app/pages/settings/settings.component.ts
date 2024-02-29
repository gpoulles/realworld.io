import { Component } from '@angular/core';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserUpdateApiDto } from '../../shared/interfaces/users-api.interface';

@Component({
  selector: 'conduit-settings',
  standalone: true,
  imports: [SettingsFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor(public readonly usersService: UsersService) {}

  saveChanges(payload: UserUpdateApiDto) {
    this.usersService.updateCurrentUser(payload).subscribe({
      next: (user) => console.log('User Updated', user),
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.usersService.logout();
  }
}
