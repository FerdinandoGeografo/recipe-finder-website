import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  imports: [MatButtonModule, RouterLink],
  template: `
    <section class="call-to-action">
      <div class="call-to-action__text">
        <p class="call-to-action__title">Ready to cook smarter?</p>
        <p class="call-to-action__subtitle">
          Hit the button, pick a recipe, and get dinner on the table—fast.
        </p>
      </div>
      <a matButton="filled" routerLink="/recipes">Browse recipes</a>
    </section>
  `,
  styles: `
    :host {
      .call-to-action {
        background: var(--neutral-200);
        border-radius: 1.6rem;

        &__text {

        }

        &__title {

        }

        &__subtitle {

        }
      }
    }
  `,
})
export class CallToAction {}
