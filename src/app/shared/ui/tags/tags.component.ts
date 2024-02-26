import { Component, Input } from '@angular/core';

@Component({
  selector: 'conduit-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent {
  @Input() tags: string[] = [];
}
