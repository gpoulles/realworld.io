import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'conduit-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  currentRoute: string = '';
  constructor(
    public usersService: UsersService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) route = route.firstChild;
          const path = route.snapshot.url
            .map((segment) => segment.path)
            .join('/');
          return path.split('/')[0];
        })
      )
      .subscribe({
        next: (firstSegment) => {
          this.currentRoute = firstSegment;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
