import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'conduit-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();
  pages: number[] = [];
  ngOnInit() {
    this.pages = Array(this.totalPages)
      .fill(1)
      .map((x, i) => x + i);
  }
}
