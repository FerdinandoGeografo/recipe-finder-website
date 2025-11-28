import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-list',
  imports: [MatIconModule],
  template: `
    <section class="about-list">
      <h2 class="about-list__title heading heading--2xl">{{ title() }}</h2>

      <ul class="about-list__list">
        @for (item of list(); track item.heading) {
        <li class="about-list__item">
          <mat-icon class="about-list__icon" svgIcon="custom:bullet-point" />

          <div class="about-list__text">
            <h3 class="about-list__heading">{{ item.heading }}</h3>
            <p class="heading heading--md">{{ item.description }}</p>
          </div>
        </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      .about-list {
        padding: 9.6rem 12.4rem;
        display: flex;
        align-items: start;
        gap: 6.4rem;

        &__title {
          min-width: 37.6rem;
        }

        &__list {
          display: flex;
          flex-direction: column;
          gap: 4.8rem;
        }

        &__item {
          display: flex;
          align-items: start;
          gap: 2rem;
        }

        &__icon {
          min-width: 3.2rem;
          height: 3.2rem;
        }

        &__text {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        &__heading {
          font-size: 2.4rem;
          line-height: 3.1rem;
          letter-spacing: -1px;
          font-weight: 700;
          color: var(--neutral-900);
        }
      }
    }
  `,
})
export class AboutList {
  title = input.required<string>();
  list = input.required<IAbout[]>();
}

export interface IAbout {
  heading: string;
  description: string;
}
