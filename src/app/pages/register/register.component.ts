import { Component } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterApiDto } from '../../shared/interfaces/register-api.interface';

@Component({
  selector: 'conduit-register',
  standalone: true,
  imports: [RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  register($event: RegisterApiDto) {
    console.log($event);
  }
}
