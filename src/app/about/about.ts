import { Component, signal } from '@angular/core';
import { CallToAction } from '../shared/ui/call-to-action';
import { AboutList, IAbout } from './ui/about-list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  imports: [AboutList, CallToAction, MatDividerModule],
  template: `
    <section class="hero">
      <div class="hero__text">
        <p class="hero__title">Our mission</p>
        <h1 class="heading heading--2xl">
          Help more people cook nourishing meals, more often.
        </h1>
        <div class="hero__descriptions heading heading--md">
          <p>
            Healthy Recipe Finder was created to prove that healthy eating can
            be convenient, affordable, and genuinely delicious.
          </p>
          <p>
            We showcase quick, whole-food dishes that anyone can master—no fancy
            equipment, no ultra-processed shortcuts—just honest ingredients and
            straightforward steps.
          </p>
        </div>
      </div>

      <img
        class="hero__img"
        src="images/image-about-our-mission-large.webp"
        alt="Our mission image"
      />
    </section>
    <mat-divider />
    <app-about-list title="Why we exist" [list]="listWhy()" />
    <mat-divider />
    <app-about-list title="Our food philosophy" [list]="listPhilosophy()" />
    <mat-divider />
    <div class="beyond">
      <div class="beyond__box">
        <div class="beyond__text">
          <h2 class="heading heading--2xl">Beyond the plate</h2>
          <div class="beyond__description">
            <p class="heading heading--md">
              We believe food is a catalyst for community and well-being. By
              sharing approachable recipes, we hope to:
            </p>
            <ul class="beyond__list heading heading--md">
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

      .hero {
        display: flex;
        align-items: center;
        gap: 6.4rem;
        padding: 8rem 12.4rem 9.6rem;

        &__text {
          display: flex;
          flex-direction: column;
          gap: 2.4rem;
        }

        &__title {
          align-self: start;
          font-size: 2rem;
          line-height: 2.8rem;
          letter-spacing: -.5px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 6px;
          background: var(--orange-500);
          color: var(--neutral-900);
        }

        &__descriptions {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        &__img {
          border-radius: 2rem;
          width: 100%;
          max-height: 60rem;
        }
      }

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

        &__description {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
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
