import { Component } from '@angular/core';
import { SettingsFormComponent } from './settings-form/settings-form.component';
import { SettingsApiDto } from '../../shared/interfaces/settings-api.interface';

@Component({
  selector: 'conduit-settings',
  standalone: true,
  imports: [SettingsFormComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  saveChanges($event: SettingsApiDto) {
    console.log($event);
  }
}
