import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Hero } from './ui/hero';
import { Features } from './ui/features';
import { CallToAction } from '../shared/ui/call-to-action';

@Component({
  selector: 'app-home',
  imports: [MatDividerModule, Hero, Features, CallToAction],
  template: `
    <app-hero />
    <app-features />
    <mat-divider />
    <section class="real-life">
      <div class="real-life__text">
        <h2 class="heading heading--2xl">Built for real life</h2>
        <p class="heading heading--md">
          Cooking shouldn’t be complicated. These recipes come in under
          <span>30 minutes</span>
          of active time, fit busy schedules, and taste good enough to repeat.
        </p>
        <p class="heading heading--md">
          Whether you’re new to the kitchen or just need fresh ideas, we’ve got
          you covered.
        </p>
      </div>
      <img
        class="real-life__img"
        src="images/image-home-real-life-large.webp"
        alt="Real life image"
      />
    </section>
    <app-call-to-action />
  `,
  styles: `
    :host {
      display: block;
      padding: 0 12.4rem;

      .real-life {
        padding: 9.6rem 0;
        display: flex;
        align-items: center;
        gap: 4.8rem;

        &__text {
          display: flex;
          flex-direction: column;
          gap: 2rem;

          .heading--2xl {
            line-height: 6.5rem;
          }

          .heading--md {
            span {
              font-family: var(--ff-base);
              letter-spacing: -.5px;
              font-weight: 700;
              position: relative;

              &::after {
                content: "";
                position: absolute;
                z-index: -1;
                left: 0;
                top: 0;
                transform: translateY(100%);
                height: 1.2rem;
                width: 100%;
                background: var(--orange-500);
                border-radius: 3px;
              }
            }
          }
        }

        &__img {
          max-width: 63.5rem;
          max-height: 45rem;
          border-radius: 1.6rem;
        }
      }
    }
  `,
})
export class Home {}
