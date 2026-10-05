import {
  afterNextRender,
  Component,
  DOCUMENT,
  inject,
  Injector,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, pairwise } from 'rxjs';
import { Header } from './shared/ui/header/header';
import { Footer } from './shared/ui/footer/footer';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private matIconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);
  #document = inject(DOCUMENT);
  #injector = inject(Injector);

  constructor() {
    this.matIconRegistry.addSvgIconSetInNamespace(
      'custom',
      this.sanitizer.bypassSecurityTrustResourceUrl('icons/icons.svg'),
    );

    // After a client-side page change, move focus to the new page heading. pairwise
    // skips the first load; query-only changes (filters) keep focus where it is.
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => e.urlAfterRedirects.split(/[?#]/)[0]),
        pairwise(),
        filter(([previous, current]) => previous !== current),
        takeUntilDestroyed(),
      )
      .subscribe(() =>
        afterNextRender(() => this.#focusHeading(), {
          injector: this.#injector,
        }),
      );
  }

  #focusHeading() {
    const heading = this.#document.querySelector<HTMLElement>('main h1');
    if (!heading) return;

    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}
