import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo, MatButtonModule, MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly links = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/recipes', label: 'Recipes' },
  ] as const;
}
