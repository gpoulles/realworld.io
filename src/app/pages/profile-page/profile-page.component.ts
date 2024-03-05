import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { tap } from 'rxjs';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/interfaces/profile.interface';

@Component({
  selector: 'conduit-profile-page',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
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

  followUser() {
    if (this.profile?.following) {
      this.profileService.unfollow(this.profile.name).subscribe({
        next: (response) => (this.profile = response),
        error: (error) => console.log(error),
      });
    } else if (!this.profile?.following && this.profile) {
      this.profileService.follow(this.profile.name).subscribe({
        next: (response) => (this.profile = response),
        error: (error) => console.log(error),
      });
    }
  }
}
