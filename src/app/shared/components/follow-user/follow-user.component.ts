import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FollowUserButtonComponent } from '../../ui/follow-user-button/follow-user-button.component';
import { Profile } from '../../interfaces/profile.interface';
import { ProfileService } from '../../services/profile.service';
import { Author } from '../../interfaces/article.interface';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'conduit-follow-user',
  standalone: true,
  imports: [FollowUserButtonComponent],
  templateUrl: './follow-user.component.html',
  styleUrl: './follow-user.component.scss',
})
export class FollowUserComponent implements OnDestroy {
  @Input({ required: true }) profile: Profile | Author | undefined;
  @Output() profileChange = new EventEmitter<Profile | Author>();
  private destroy$ = new Subject<void>();
  constructor(
    private readonly profileService: ProfileService,
    private readonly usersService: UsersService
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  followUser() {
    if (this.usersService.currentUser()) {
      if (this.profile?.following) {
        this.profileService
          .unfollow(this.profile.name)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) =>
              this.profileChange.emit({ ...response, following: false }),
            error: (error) => console.error(error),
          });
      } else if (!this.profile?.following && this.profile) {
        this.profileService
          .follow(this.profile.name)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) =>
              this.profileChange.emit({ ...response, following: true }),
            error: (error) => console.error(error),
          });
      }
    }
  }
}
