import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'conduit-popular-tags',
  standalone: true,
  imports: [],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent {
  @Input() tags: string[] = [];
  @Output() tagSelected: EventEmitter<string> = new EventEmitter<string>();
}
