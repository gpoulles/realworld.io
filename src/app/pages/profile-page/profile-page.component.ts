import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/interfaces/profile.interface';
import { FollowUserComponent } from '../../shared/components/follow-user/follow-user.component';

@Component({
  selector: 'conduit-profile-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet, FollowUserComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  loadingProfile = false;
  profile: Profile | undefined = undefined;

  constructor(
    private readonly profileService: ProfileService,
    private readonly route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.profileService
      .getProfile(this.route.snapshot.params['username'])
      .pipe(
        tap({
          subscribe: () => (this.loadingProfile = true),
          finalize: () => (this.loadingProfile = false),
        })
      )
      .subscribe({
        next: (response) => (this.profile = response),
        error: (error) => console.log(error),
      });
  }
}
