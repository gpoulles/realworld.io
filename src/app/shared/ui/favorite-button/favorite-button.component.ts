import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'conduit-favorite-button',
  standalone: true,
  imports: [],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.scss',
})
export class FavoriteButtonComponent {
  @Input() favorites: number = 0;
  @Input() isFavorited: boolean = false;
  @Input() extended: boolean = false;
  @Output() favorited: EventEmitter<void> = new EventEmitter<void>();
}
