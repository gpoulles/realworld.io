import { Component, OnDestroy } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { UsersService } from '../../shared/services/users.service';
import { UserLoginApiDto } from '../../shared/interfaces/users-api.interface';
import { Router, RouterLink } from '@angular/router';
import { ErrorResponse } from '../../shared/interfaces/error.interface';
import { ErrorMessagesComponent } from '../../shared/ui/error-messages/error-messages.component';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'conduit-login',
  standalone: true,
  imports: [LoginFormComponent, ErrorMessagesComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  errorMessages: string[] = [];
  private destroy$ = new Subject<void>();
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(loginFormValue: UserLoginApiDto) {
    this.usersService
      .loginUser(loginFormValue)
      .pipe(
        takeUntil(this.destroy$),
        tap({ subscribe: () => (this.errorMessages = []) })
      )
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error: ErrorResponse) => {
          this.errorMessages = error.error.errorMessages || [
            'An unexpected error occurred.',
          ];
        },
      });
  }
}
