import { Component } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserRegisterApiDto } from '../../shared/interfaces/users-api.interface';
import { UsersService } from '../../shared/services/users.service';
import { Router, RouterLink } from '@angular/router';
import { ErrorResponse } from '../../shared/interfaces/error.interface';
import { LoginFormComponent } from '../login/login-form/login-form.component';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';

@Component({
  selector: 'conduit-register',
  standalone: true,
  imports: [
    RegisterFormComponent,
    LoginFormComponent,
    ErrorMessagesComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errorMessages: string[] = [];
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}
  register(registerFormValue: UserRegisterApiDto) {
    this.usersService.registerUser(registerFormValue).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error: ErrorResponse) => {
        this.errorMessages = error.error.errorMessages || [
          'An unexpected error occurred.',
        ];
      },
    });
  }
}
