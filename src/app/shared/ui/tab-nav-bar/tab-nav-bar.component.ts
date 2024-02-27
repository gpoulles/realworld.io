import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabNavBarItem } from '../../interfaces/tab-nav-bar.interface';
import { TabNavBarType } from '../../enums/tab-nav-bar-type.enum';

@Component({
  selector: 'conduit-tab-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './tab-nav-bar.component.html',
  styleUrl: './tab-nav-bar.component.scss',
})
export class TabNavBarComponent {
  @Input() items: TabNavBarItem[] = [
    {
      type: TabNavBarType.GLOBALFEED,
      label: 'Global',
      active: true,
    },
  ];
  @Output() itemSelected: EventEmitter<TabNavBarItem> =
    new EventEmitter<TabNavBarItem>();
}
