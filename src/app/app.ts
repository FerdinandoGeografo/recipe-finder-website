import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/ui/footer/footer';
import { Header } from './shared/ui/header/header';
import { focusHeadingOnPageChange } from './shared/utils/route-focus';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
})
export class App {
  constructor() {
    focusHeadingOnPageChange();
  }
}
