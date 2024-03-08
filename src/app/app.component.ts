import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UsersService } from './shared/services/users.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'conduit-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'realworldio';
  private destroy$ = new Subject<void>();
  constructor(private readonly usersService: UsersService) {}
  ngOnInit() {
    if (localStorage.getItem('token'))
      this.usersService
        .getCurrentUser()
        .pipe(takeUntil(this.destroy$))
        .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
