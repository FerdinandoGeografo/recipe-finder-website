import { Component, DOCUMENT, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:pointerdown)': 'onOutsidePointer($event)',
    '(document:keydown.escape)': 'onEscape($event)',
    '(focusout)': 'onFocusOut($event)',
    '(window:resize)': 'onResize()',
  },
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menuButton = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly navigation = viewChild.required<ElementRef<HTMLElement>>('navigation');

  protected readonly menuOpen = signal(false);
  protected readonly links = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/recipes', label: 'Recipes' },
  ] as const;

  constructor() {
    inject(Router).events.pipe(
      filter((event) => event instanceof NavigationStart),
      takeUntilDestroyed(),
    ).subscribe(() => this.closeMenu());
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(restoreFocus = true): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (restoreFocus) this.menuButton().nativeElement.focus({ preventScroll: true });
  }

  protected onOutsidePointer(event: PointerEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) this.closeMenu();
  }

  protected onEscape(event: Event): void {
    if (!this.menuOpen()) return;
    event.preventDefault();
    this.closeMenu();
  }

  protected onFocusOut(event: FocusEvent): void {
    if (!this.element.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.closeMenu(false);
    }
  }

  protected onResize(): void {
    const button = this.menuButton().nativeElement;
    if (button.getClientRects().length) return;
    this.closeMenu(false);
    if (this.document.activeElement === button) {
      this.navigation().nativeElement.querySelector<HTMLAnchorElement>('a')?.focus();
    }
  }
}
