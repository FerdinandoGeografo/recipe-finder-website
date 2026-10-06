import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  template: '',
  styleUrl: './skeleton.scss',
  host: {
    'aria-hidden': 'true',
    '[style.--skeleton-width]': 'width()',
    '[style.--skeleton-height]': 'height()',
    '[style.--skeleton-radius]': 'radius()',
  },
})
export class Skeleton {
  readonly width = input<string>();
  readonly height = input<string>();
  readonly radius = input<string>();
}
