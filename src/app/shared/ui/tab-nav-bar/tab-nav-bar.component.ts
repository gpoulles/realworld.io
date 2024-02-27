import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabNavBarItem } from '../../interfaces/tab-nav-bar.interface';

@Component({
  selector: 'conduit-tab-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './tab-nav-bar.component.html',
  styleUrl: './tab-nav-bar.component.scss',
})
export class TabNavBarComponent {
  @Input() items: TabNavBarItem[] = [];
  @Output() itemSelected: EventEmitter<TabNavBarItem> =
    new EventEmitter<TabNavBarItem>();
}
