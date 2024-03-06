import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FollowUserButtonComponent } from '../../ui/follow-user-button/follow-user-button.component';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { Author } from '../../interfaces/article.interface';

@Component({
  selector: 'conduit-follow-user',
  standalone: true,
  imports: [FollowUserButtonComponent],
  templateUrl: './follow-user.component.html',
  styleUrl: './follow-user.component.scss',
})
export class FollowUserComponent {
  @Input() profile: Profile | Author | undefined = undefined;
  @Output() profileChange = new EventEmitter<Profile | Author>();

  constructor(private readonly profileService: ProfileService) {}

  followUser() {
    if (this.profile?.following) {
      this.profileService.unfollow(this.profile.name).subscribe({
        next: (response) =>
          this.profileChange.emit({ ...response, following: false }),
        error: (error) => console.log(error),
      });
    } else if (!this.profile?.following && this.profile) {
      this.profileService.follow(this.profile.name).subscribe({
        next: (response) =>
          this.profileChange.emit({ ...response, following: true }),
        error: (error) => console.log(error),
      });
    }
  }
}
