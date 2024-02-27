import { TabNavBarType } from '../enums/tab-nav-bar-type.enum';

export interface TabNavBarItem {
  label: string;
  type: TabNavBarType;
  active: boolean;
}
