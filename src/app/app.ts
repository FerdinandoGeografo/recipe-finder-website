import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/ui/header';
import { Footer } from './shared/ui/footer';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main class="main">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: ``,
})
export class App {
  #matIconRegistry = inject(MatIconRegistry);
  #domSanitizer = inject(DomSanitizer);

  constructor() {
    this.#matIconRegistry.addSvgIconSetInNamespace(
      'custom',
      this.#domSanitizer.bypassSecurityTrustResourceUrl('icons/icons.svg')
    );
  }
}
