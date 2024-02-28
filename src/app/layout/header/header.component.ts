import { Component } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public usersService: UsersService) {}
}
