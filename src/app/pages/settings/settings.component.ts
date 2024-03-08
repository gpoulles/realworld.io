import { Component, OnDestroy } from '@angular/core';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserUpdateApiDto } from '../../shared/interfaces/users-api.interface';
import { ErrorResponse } from '../../shared/interfaces/error.interface';
import { LoginFormComponent } from '../login/login-form/login-form.component';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'conduit-settings',
  standalone: true,
  imports: [SettingsFormComponent, LoginFormComponent, ErrorMessagesComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnDestroy {
  errorMessages: string[] = [];
  private destroy$ = new Subject<void>();
  constructor(public readonly usersService: UsersService) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  saveChanges(payload: UserUpdateApiDto) {
    this.usersService
      .updateCurrentUser(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
