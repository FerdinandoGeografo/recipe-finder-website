import { Component, input } from '@angular/core';
import { Reveal } from '../../../shared/directives/reveal';
import { Recipe } from '../../types/recipe.model';
import { RecipeCard } from '../recipe-card/recipe-card';

@Component({
  selector: 'app-recipes-list',
  imports: [Reveal, RecipeCard],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {
  readonly recipes = input.required<readonly Recipe[]>();
  readonly headingLevel = input<2 | 3>(2);
  // NgOptimizedImage priority must not change after init, so it follows recipe ids, not positions.
  readonly priorityRecipeIds = input<readonly number[]>([]);
}
