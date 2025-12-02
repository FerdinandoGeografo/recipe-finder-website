import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from './logo';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    Logo,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    TitleCasePipe,
  ],
  template: `
    <header class="header">
      <mat-toolbar class="header__toolbar">
        <app-logo />

        <mat-nav-list class="header__nav">
          @for (link of links(); track $index) {
          <a
            class="header__nav-link"
            mat-list-item
            [routerLink]="link"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            {{ link | titlecase }}
          </a>
          }
        </mat-nav-list>

        <a
          [style.marginLeft.px]="93"
          [style.--mat-button-filled-container-height.rem]="5.2"
          [style.--mat-button-filled-horizontal-padding.rem]="1.6"
          matButton="filled"
          routerLink="/recipes"
          >Browse recipes</a
        >
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

        &__nav {
          padding: 0;
          display: flex;
          align-items: center;
          gap: 4rem;
          --mat-ripple-color: transparent;

          @include mat.list-overrides((
            list-item-container-shape: 0,
            active-indicator-shape: 0,
            active-indicator-color: transparent,
            list-item-container-color: transparent,
            list-item-hover-state-layer-color: transparent,
            list-item-focus-state-layer-color: transparent,
            list-item-hover-label-text-color: var(--neutral-900),
            list-item-focus-label-text-color: var(--neutral-900),
            list-item-label-text-color: var(--neutral-900),
            list-item-selected-container-color: transparent,
            list-item-label-text-line-height: 2.7rem,
            list-item-label-text-size: 1.8rem,
            list-item-label-text-tracking: -.3px,
            list-item-label-text-weight: 600,
            list-item-one-line-container-height: 2.7rem,
          ));
        }

        &__nav-link {
          width: auto;
          padding: 0;
          position: relative;
          transition: all .3s;
          border-radius: 4px;
          overflow: visible;

          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 3px;
            background: var(--orange-500);
            border-radius: 4px;
            transform: scaleX(0);
            transition: transform .35s;
          }

          &:hover, &.active {
            &::after {
              transform: scaleX(1);
            }
          }

          &:not(.active):focus {
            box-shadow: 0 0 0 2px var(--neutral-100), 0 0 0 4px var(--neutral-900);
          }
        }
      }
    }
  `,
})
export class Header {
  protected links = signal<string[]>(['home', 'about', 'recipes']);
}
