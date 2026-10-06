import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Header } from './shared/ui/header/header';
import { Footer } from './shared/ui/footer/footer';
import { focusHeadingOnPageChange } from './shared/route-focus';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(MatIconRegistry).addSvgIconSetInNamespace(
      'custom',
      inject(DomSanitizer).bypassSecurityTrustResourceUrl('icons/icons.svg'),
    );

    focusHeadingOnPageChange();
  }
}
