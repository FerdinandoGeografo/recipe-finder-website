import { Component } from '@angular/core';
import { Hero } from './ui/hero';
import { Features } from './ui/features';

@Component({
  selector: 'app-home',
  imports: [Hero, Features],
  template: `
    <app-hero />
    <app-features />
  `,
  styles: `
    :host {
      display: block;
      padding: 0 12.4rem;
    }
  `,
})
export class Home {}
