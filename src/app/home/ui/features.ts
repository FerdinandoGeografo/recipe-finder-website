import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  imports: [MatIconModule],
  template: `
    <section class="features">
      <p class="heading heading--2xl">What you’ll get</p>

      <div class="features__list">
        @for (feature of features(); track feature.title) {
        <div class="feature">
          <div class="feature__icon-box">
            <mat-icon
              class="feature__icon"
              [svgIcon]="'custom:' + feature.icon"
            />
          </div>

          <div class="feature__text">
            <p class="feature__title">{{ feature.title }}</p>
            <p class="heading heading--md">{{ feature.description }}</p>
          </div>
        </div>
        }
      </div>
    </section>
  `,
  styles: `
    @use '@angular/material';

    :host {
      .features {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4.8rem;
        padding-bottom: 9.6rem;

        &__list {
          display: flex;
          gap: 3.2rem;
        }

        .feature {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: start;
          gap: 2.4rem;

          &__icon-box {
            --box-size: 6rem;
            width: var(--box-size);
            height: var(--box-size);
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--neutral-0);
            border-radius: 1.2rem;
            border: 1px solid var(--neutral-200);
            box-shadow: 0 1px 0 0 var(--neutral-200);
          }

          &__text {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
          }

          &__title {
            font-size: 3.2rem;
            line-height: 4.2rem;
            letter-spacing: -.1px;
            font-weight: 700;
            color: var(--neutral-900);
          }
        }
      }
    }
  `,
})
export class Features {
  protected features = signal<IFeature[]>([
    {
      icon: 'whole-food-recipes',
      title: 'Whole-food recipes',
      description: 'Each dish uses everyday, unprocessed ingredients.',
    },
    {
      icon: 'minimum-fuss',
      title: 'Minimum fuss',
      description:
        'All recipes are designed to make eating healthy quick and easy.',
    },
    {
      icon: 'search-in-seconds',
      title: 'Search in seconds',
      description:
        'Filter by name or ingredient and jump straight to the recipe you need.',
    },
  ]);
}

interface IFeature {
  icon: string;
  title: string;
  description: string;
}
