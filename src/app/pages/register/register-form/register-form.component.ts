import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterApiDto } from '../../../shared/interfaces/register-api.interface';

@Component({
  selector: 'conduit-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent implements OnInit {
  @Output() submitted: EventEmitter<RegisterApiDto> =
    new EventEmitter<RegisterApiDto>();
  registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  submit() {
    if (this.registerForm.valid) this.submitted.emit(this.registerForm?.value);
  }
}
