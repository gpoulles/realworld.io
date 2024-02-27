import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'conduit-popular-tags',
  standalone: true,
  imports: [],
  templateUrl: './popular-tags.component.html',
  styleUrl: './popular-tags.component.scss',
})
export class PopularTagsComponent {
  @Input() tags: string[] = ['test1', 'test2', 'test3'];
  @Output() tagSelected: EventEmitter<string> = new EventEmitter<string>();
}
