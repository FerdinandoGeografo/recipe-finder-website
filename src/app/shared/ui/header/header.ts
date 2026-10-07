import {
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { filter } from 'rxjs';
import { navigationLinks } from '../../constants/navigation';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [
    Logo,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(window:resize)': 'onResize()',
  },
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly menuTrigger = viewChild.required(MatMenuTrigger);
  private readonly menuButton = viewChild.required<
    MatMenuTrigger,
    ElementRef<HTMLButtonElement>
  >(MatMenuTrigger, {
    read: ElementRef,
  });
  private readonly navigation =
    viewChild.required<ElementRef<HTMLElement>>('navigation');

  protected readonly navigationLinks = navigationLinks;

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuTrigger().closeMenu());
  }

  // The toggle is hidden from lg: close the menu and keep focus inside the visible navigation.
  protected onResize(): void {
    const button = this.menuButton().nativeElement;
    if (button.getClientRects().length) return;
    const trigger = this.menuTrigger();
    const restoreFocus =
      trigger.menuOpen || this.document.activeElement === button;
    trigger.closeMenu();
    if (restoreFocus) {
      this.navigation()
        .nativeElement.querySelector<HTMLAnchorElement>('a')
        ?.focus();
    }
  }
}
