import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserLoginApiDto } from '../../shared/interfaces/users-api.interface';

@Component({
  selector: 'conduit-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private readonly usersService: UsersService) {}
  login(loginFormValue: UserLoginApiDto) {
    this.usersService.loginUser(loginFormValue).subscribe({
      next: (user) => console.log('redirect User', user),
      error: (error) => console.log('error', error),
    });
  }
}
