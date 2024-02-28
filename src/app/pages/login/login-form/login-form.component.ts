import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginApiDto } from '../../../shared/interfaces/login-api.interface';

@Component({
  selector: 'conduit-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  @Output() submitted: EventEmitter<LoginApiDto> =
    new EventEmitter<LoginApiDto>();
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  submit() {
    if (this.loginForm.valid) this.submitted.emit(this.loginForm?.value);
  }
}
