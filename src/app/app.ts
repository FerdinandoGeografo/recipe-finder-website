import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/ui/header';
import { Footer } from './shared/ui/footer';

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
export class App {}
