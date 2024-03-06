import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { Profile } from '../../shared/interfaces/profile.interface';
import { FollowUserComponent } from '../../shared/components/follow-user/follow-user.component';

@Component({
  selector: 'conduit-profile-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FollowUserComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  profile: Profile | undefined = undefined;
  activeMenuItem: string = '';
  destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        })
      )
      .subscribe((route) => {
        const childRoute = route.snapshot;
        this.activeMenuItem = childRoute.routeConfig?.path ?? '';
      });

    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(({ profile }) => {
      this.profile = profile;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
