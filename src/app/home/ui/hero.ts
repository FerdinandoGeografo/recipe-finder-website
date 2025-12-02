import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [MatButtonModule, RouterLink],
  template: `
    <section class="hero">
      <img
        class="hero__illustration"
        src="images/pattern-squiggle-1.svg"
        alt=""
      />
      <div class="hero__text">
        <h1 class="hero__title">Healthy meals, zero fuss</h1>
        <p class="hero__subtitle heading heading--md">
          Discover eight quick, whole-food recipes that you can cook tonight—no
          processed junk, no guesswork.
        </p>
        <a matButton="filled" routerLink="/about"> Start exploring </a>
      </div>
      <div class="hero__img-box">
        <img
          class="hero__img"
          src="images/image-home-hero-large.webp"
          alt="Hero image"
        />
      </div>
    </section>
  `,
  styles: `
    :host {
      .hero {
        padding: 8rem 0 9.6rem;
        display: flex;
        flex-direction: column;
        gap: 8rem;
        position: relative;

        &__illustration {
          position: absolute;
          top: 20%;
          left: -12.4rem;
          z-index: -1;
          width: 144rem;
        }

        &__text {
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
          position: relative;

          &::after {
            content: "";
            position: absolute;
            width: 27rem;
            height: 3.9rem;
            border-radius: 4px;
            background: var(--orange-500);
            opacity: .4;
            left: 0;
            bottom: 0;
            z-index: -1;
          }
        }

        &__subtitle {
          margin-bottom: 2.8rem;
          text-align: center;
          max-width: 58rem;
          flex: 1;
        }

        &__img-box {
          display: flex;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            background: var(--neutral-0);
            border-radius: 2.4rem;
            display: block;
            height: calc(100% + 2.4rem);
            width: calc(100% + 2.4rem);
            z-index: -1;
            top: -1.2rem;
            left: -1.2rem;
          }
        }

        &__img {
          width: 100%;
          max-height: 53rem;
          border-radius: 1.2rem;
        }
      }
    }
  `,
})
export class Hero {}
