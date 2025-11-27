import { Component, signal } from '@angular/core';
import { CallToAction } from '../shared/ui/call-to-action';
import { AboutList, IAbout } from './ui/about-list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  imports: [AboutList, CallToAction, MatDividerModule],
  template: `
    <app-about-list title="Why we exist" [list]="listWhy()" />
    <mat-divider />
    <app-about-list title="Our food philosophy" [list]="listPhilosophy()" />
    <div class="beyond">
      <div class="beyond__box">
        <div class="beyond__text">
          <h2 class="beyond__heading">Beyond the plate</h2>
          <div class="beyond__description">
            <p class="beyond__paragraph">
              We believe food is a catalyst for community and well-being. By
              sharing approachable recipes, we hope to:
            </p>
            <ul class="beyond__list">
              <li>Encourage family dinners and social cooking.</li>
              <li>
                Reduce reliance on single-use packaging and delivery waste.
              </li>
              <li>
                Spark curiosity about seasonal produce and local agriculture.
              </li>
            </ul>
          </div>
        </div>
        <img
          class="beyond__img"
          src="images/image-about-beyond-the-plate-large.webp"
          alt="Beyond the plate image"
        />
      </div>

      <app-call-to-action />
    </div>
  `,
  styles: `
    :host {
      display: block;

      .beyond {
        padding: 0 12.4rem;

        &__box {
          padding: 9.6rem 0;
          display: flex;
          align-items: center;
          gap: 6.4rem;
        }

        &__text {
          min-width: 37.6rem;
          padding-left: 4px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        &__heading {
          font-size: 4.8rem;
          line-height: 5.8rem;
          font-weight: 800;
          color: var(--neutral-900);
          letter-spacing: -2px;
        }

        &__description {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        &__paragraph {
          font-family: var(--ff-sans);
          font-size: 2rem;
          line-height: 3rem;
          letter-spacing: -.4px;
          font-weight: 500;
          color: var(--neutral-800);
        }

        &__list {
          display: flex;
          flex-direction: column;

          li {
            display: flex;
            align-items: start;
            gap: 1.2rem;
            margin-left: 1rem;


            &::before {
              content: "";
              margin-top: 1.1rem;
              height: 8px;
              min-width: 8px;
              border-radius: var(--mat-sys-corner-full);
              background: var(--neutral-800);

            }

            font-family: var(--ff-sans);
            font-size: 2rem;
            line-height: 3rem;
            letter-spacing: -.4px;
            font-weight: 500;
            color: var(--neutral-800);
          }
        }

        &__img {
          width: 100%;
          max-height: 40rem;
          border-radius: 2rem;
        }
      }
    }
  `,
})
export class About {
  listWhy = signal<IAbout[]>([
    {
      heading: 'Cut through the noise.',
      description:
        'The internet is bursting with recipes, yet most busy cooks still default to take-away or packaged foods. We curate a tight collection of fool-proof dishes so you can skip the scrolling and start cooking.',
    },
    {
      heading: 'Empower home kitchens.',
      description:
        'When you control what goes into your meals, you control how you feel. Every recipe is built around unrefined ingredients and ready in about half an hour of active prep.',
    },
    {
      heading: 'Make healthy look good.',
      description:
        'High-resolution imagery shows you exactly what success looks like—because we eat with our eyes first, and confidence matters.',
    },
  ]);
  listPhilosophy = signal<IAbout[]>([
    {
      heading: 'Whole ingredients first.',
      description:
        'Fresh produce, grains, legumes, herbs, and quality fats form the backbone of every recipe.',
    },
    {
      heading: 'Flavor without compromise.',
      description:
        'Spices, citrus, and natural sweetness replace excess salt, sugar, and additives.',
    },
    {
      heading: 'Respect for time.',
      description:
        'Weeknight meals should slot into real schedules; weekend cooking can be leisurely but never wasteful.',
    },
    {
      heading: 'Sustainable choices.',
      description:
        'Short ingredient lists cut down on food waste and carbon footprint, while plant-forward dishes keep things planet-friendly.',
    },
  ]);
}
