import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserLoginApiDto } from '../../shared/interfaces/users-api.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'conduit-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}
  login(loginFormValue: UserLoginApiDto) {
    this.usersService.loginUser(loginFormValue).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.log('error', error),
    });
  }
}
