import { Component, DOCUMENT, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { filter } from 'rxjs';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo, MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly menuTrigger = viewChild.required(MatMenuTrigger);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly navigation = viewChild.required<ElementRef<HTMLElement>>('navigation');

  protected readonly links = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/recipes', label: 'Recipes' },
  ] as const;

  constructor() {
    inject(Router).events.pipe(
      filter((event) => event instanceof NavigationStart),
      takeUntilDestroyed(),
    ).subscribe(() => this.menuTrigger().closeMenu());
  }

  protected onResize(): void {
    const button = this.menuButton().nativeElement;
    if (button.getClientRects().length) return;
    const trigger = this.menuTrigger();
    const restoreFocus = trigger.menuOpen || this.document.activeElement === button;
    trigger.closeMenu();
    if (restoreFocus) {
      this.navigation().nativeElement.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  }
}
