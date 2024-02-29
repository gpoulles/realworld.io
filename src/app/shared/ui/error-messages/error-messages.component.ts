import { Component, Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'conduit-error-messages',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './error-messages.component.html',
  styleUrl: './error-messages.component.scss',
})
export class ErrorMessagesComponent {
  @Input() errorMessages: string[] = [];
}
