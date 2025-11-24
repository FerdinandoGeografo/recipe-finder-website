import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule],
  template: `
    <footer class="footer">
      <mat-toolbar class="footer__toolbar">
        <span>Made with ❤️ and 🥑</span>

        <div class="footer__socials"></div>
      </mat-toolbar>
    </footer>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      .footer {
        &__toolbar {
          justify-content: space-between;
          padding: 0 12.4rem;

          @include mat.toolbar-overrides((
            container-background-color: transparent,
            title-text-font: var(--ff-sans),
            title-text-size: 1.6rem,
            title-text-line-height: 2.4rem,
            title-text-tracking: -.3px,
            title-text-weight: 500,
            standard-height: 10.4rem,
            mobile-height: 7.2rem,
          ));
        }
      }
    }
  `,
})
export class Footer {}
