import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CallToAction } from '../shared/ui/call-to-action/call-to-action';
import { AboutList, IAbout } from './ui/about-list/about-list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  imports: [AboutList, CallToAction, MatDividerModule],
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './about.scss',
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
