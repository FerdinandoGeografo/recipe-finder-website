import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from './logo';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, Logo, MatButtonModule, RouterLink],
  template: `
    <header class="header">
      <mat-toolbar class="header__toolbar">
        <app-logo />

        <div class="header__list">
          <a matButton="filled" routerLink="/"> Home </a>
          <a matButton="filled" routerLink="/about"> About </a>
          <a matButton="filled" routerLink="/recipes"> Recipes </a>
        </div>

        <a matButton="filled" routerLink="/recipes">Browse recipes</a>
      </mat-toolbar>
    </header>
  `,
  styles: `
    @use "@angular/material" as mat;

    :host {
      .header {
        &__toolbar {
          justify-content: space-between;
          padding: 0 6rem;
          border-bottom: 1px solid var(--neutral-300);

          @include mat.toolbar-overrides((
            container-background-color: transparent,
            standard-height: 10rem,
            mobile-height: 7.2rem,
          ));
        }

        &__list {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
      }
    }
  `,
})
export class Header {}
