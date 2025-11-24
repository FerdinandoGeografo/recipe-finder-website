import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from './logo';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, Logo, MatButtonModule],
  template: `
    <header class="header">
      <mat-toolbar class="header__toolbar">
        <app-logo />

        <a matButton="filled">Browse recipes</a>
      </mat-toolbar>
    </header>
  `,
  styles: `
    @use "@angular/material" as mat;

    :host {
      .header {

      }
    }
  `,
})
export class Header {}
