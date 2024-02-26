import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'conduit-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();
}
