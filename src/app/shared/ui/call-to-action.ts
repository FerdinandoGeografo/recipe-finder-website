import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-call-to-action',
  imports: [MatButtonModule, RouterLink],
  template: `
    <section class="call-to-action">
      <img
        class="call-to-action__illustration"
        src="images/pattern-fork.svg"
        alt=""
      />
      <div class="call-to-action__text">
        <p class="call-to-action__title">Ready to cook smarter?</p>
        <p class="call-to-action__subtitle">
          Hit the button, pick a recipe, and get dinner on the table—fast.
        </p>
      </div>
      <a
        [style.--mat-button-filled-container-height.rem]="5.7"
        matButton="filled"
        routerLink="/recipes"
      >
        Browse recipes
      </a>
      <img
        class="call-to-action__illustration"
        src="images/pattern-knife.svg"
        alt=""
      />
    </section>
  `,
  styles: `
    :host {
      .call-to-action {
        padding: 9.6rem 0;
        background: var(--neutral-200);
        border-radius: 1.6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4rem;
        position: relative;
        overflow: hidden;

        &__illustration {
          position: absolute;

          &:first-child {
            top: 2.3rem;
            left: 0;
            transform: translateX(-7.3rem);
          }

          &:last-child {
            top: 2.4rem;
            right: 0;
            transform: translateX(7rem);
          }
        }

        &__text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          text-align: center;
        }

        &__title {
          font-size: 4.8rem;
          line-height: 6.5rem;
          letter-spacing: -3px;
          font-weight: 800;
          color: var(--neutral-900);
        }

        &__subtitle {
          font-family: var(--ff-sans);
          font-size: 2rem;
          line-height: 3rem;
          letter-spacing: -.4px;
          font-weight: 500;
          color: var(--neutral-800);
        }
      }
    }
  `,
})
export class CallToAction {}
