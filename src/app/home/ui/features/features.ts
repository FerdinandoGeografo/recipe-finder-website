import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  imports: [MatIconModule],
  templateUrl: './features.html',
  styleUrl: './features.scss',
})
export class Features {
  protected readonly features: readonly Feature[] = [
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
  ];
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}
