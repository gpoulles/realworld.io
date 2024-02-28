import { Component } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { UserRegisterApiDto } from '../../shared/interfaces/users-api.interface';
import { UsersService } from '../../shared/services/users.service';

@Component({
  selector: 'conduit-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private readonly usersService: UsersService) {}
  register(registerFormValue: UserRegisterApiDto) {
    this.usersService.registerUser(registerFormValue).subscribe({
      next: (user) => console.log('user registered', user),
      error: (error) => console.log('error', error),
    });
  }
}
