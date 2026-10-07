import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

// A titled list of the recipe; the host is the region named by its heading.
@Component({
  selector: 'app-recipe-steps',
  imports: [NgTemplateOutlet, MatIcon],
  templateUrl: './recipe-steps.html',
  styleUrl: './recipe-steps.scss',
  host: {
    role: 'region',
    '[attr.aria-labelledby]': 'headingId()',
  },
})
export class RecipeSteps {
  readonly heading = input.required<string>();
  readonly items = input.required<readonly string[]>();
  readonly ordered = input(false, { transform: booleanAttribute });

  protected readonly headingId = computed(
    () => `${this.heading().toLowerCase().replace(/[^a-z]+/g, '')}-heading`,
  );
}
