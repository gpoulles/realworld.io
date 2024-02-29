import { Component } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserRegisterApiDto } from '../../shared/interfaces/users-api.interface';
import { UsersService } from '../../shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'conduit-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}
  register(registerFormValue: UserRegisterApiDto) {
    this.usersService.registerUser(registerFormValue).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => {
        error.errors.map();
      },
    });
  }
}
