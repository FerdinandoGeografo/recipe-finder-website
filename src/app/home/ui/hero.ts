import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hero',
  imports: [MatButtonModule],
  template: `
    <section class="hero__heading-box">
      <h1 class="hero__title">Healthy meals, zero fuss</h1>
      <p class="hero__subtitle">
        Discover eight quick, whole-food recipes that you can cook tonight—no
        processed junk, no guesswork.
      </p>

      <a matButton="filled" href="#"> Start exploring </a>
    </section>
  `,
  styles: `
    :host {
      padding: 8rem 0 9.6rem;
      display: flex;
      flex-direction: column;
      gap: 8rem;

      .hero {
        &__heading-box {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          align-items: center;
        }

        &__title {
          font-size: 7.2rem;
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 7.9rem;
          color: var(--neutral-900);
        }

        &__subtitle {
          margin-bottom: 2.8rem;
          font-family: var(--ff-sans);
          font-size: 2rem;
          font-weight: 500;
          letter-spacing: -.4px;
          line-height: 3rem;
          color: var(--neutral-800);
          text-align: center;
          max-width: 58rem;
          flex: 1;
        }
      }
    }
  `,
})
export class Hero {}
