import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'conduit-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
