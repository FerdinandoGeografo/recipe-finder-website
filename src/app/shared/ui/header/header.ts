import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { Logo } from '../logo/logo';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    Logo,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
  ],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.scss',
})
export class Header {
  protected readonly links = signal<string[]>(['home', 'about', 'recipes']);
}
