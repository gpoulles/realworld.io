import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserLoginApiDto } from '../../shared/interfaces/users-api.interface';
import { Router, RouterLink } from '@angular/router';
import { ErrorResponse } from '../../shared/interfaces/error.interface';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';

@Component({
  selector: 'conduit-login',
  standalone: true,
  imports: [LoginFormComponent, ErrorMessagesComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessages: string[] = [];
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}
  login(loginFormValue: UserLoginApiDto) {
    this.usersService.loginUser(loginFormValue).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error: ErrorResponse) => {
        this.errorMessages = error.error.errorMessages || [
          'An unexpected error occurred.',
        ];
      },
    });
  }
}
