import { Component } from '@angular/core';
import { Hero } from './ui/hero';
import { Features } from './ui/features';
import { CallToAction } from '../shared/ui/call-to-action';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, CallToAction],
  template: `
    <app-hero />
    <app-features />
    <app-call-to-action />
  `,
  styles: `
    :host {
      display: block;
      padding: 0 12.4rem;
    }
  `,
})
export class Home {}
