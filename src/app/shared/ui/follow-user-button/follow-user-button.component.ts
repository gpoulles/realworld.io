import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../interfaces/profile.interface';
import { Author } from '../../interfaces/article.interface';

@Component({
  selector: 'conduit-follow-user-button',
  standalone: true,
  imports: [],
  templateUrl: './follow-user-button.component.html',
  styleUrl: './follow-user-button.component.scss',
})
export class FollowUserButtonComponent {
  @Input() profile: Profile | Author | undefined = undefined;
  @Output() followUser: EventEmitter<void> = new EventEmitter<void>();
}
