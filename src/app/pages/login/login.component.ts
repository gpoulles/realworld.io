import { Component } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginApiDto } from '../../shared/interfaces/login-api.interface';

@Component({
  selector: 'conduit-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login($event: LoginApiDto) {
    console.log($event);
  }
}
