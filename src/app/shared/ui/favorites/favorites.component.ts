import { Component, Input } from '@angular/core';

@Component({
  selector: 'conduit-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  @Input() favorites: number = 0;
  @Input() extended: boolean = false;
}
