import {
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationSkipped,
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { filter } from 'rxjs';
import { navigationLinks } from '../../constants/navigation';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [Logo, MatButton, MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscape()',
    '(window:resize)': 'onResize()',
  },
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly menuButton =
    viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');
  private readonly navigation =
    viewChild.required<ElementRef<HTMLElement>>('navigation');

  protected readonly navigationLinks = navigationLinks;
  protected readonly menuOpen = signal(false);

  constructor() {
    // A link to the current page is skipped, not started: close in both cases.
    inject(Router)
      .events.pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationSkipped,
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.closeMenu());
  }

  protected onEscape(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.menuButton().nativeElement.focus();
  }

  // A hidden link would drop focus to the body; page changes later move it to the heading.
  private closeMenu(): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (this.navigation().nativeElement.contains(this.document.activeElement)) {
      this.menuButton().nativeElement.focus();
    }
  }

  // An outside click keeps focus where the browser put it.
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) {
      this.menuOpen.set(false);
    }
  }

  // The toggle is hidden from lg: close the menu and keep focus inside the visible navigation.
  protected onResize(): void {
    const button = this.menuButton().nativeElement;
    if (button.getClientRects().length) return;
    const restoreFocus =
      this.menuOpen() || this.document.activeElement === button;
    this.menuOpen.set(false);
    if (restoreFocus) {
      this.navigation()
        .nativeElement.querySelector<HTMLAnchorElement>('a')
        ?.focus();
    }
  }
}
