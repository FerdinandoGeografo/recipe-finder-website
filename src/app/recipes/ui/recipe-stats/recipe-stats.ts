import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { recipeStats } from '../../constants/recipe-stats';
import { Recipe } from '../../types/recipe.model';

@Component({
  selector: 'app-recipe-stats',
  imports: [MatIcon],
  templateUrl: './recipe-stats.html',
  styleUrl: './recipe-stats.scss',
  host: {
    '[class.recipe-stats--compact]': "size() === 'compact'",
  },
})
export class RecipeStats {
  readonly recipe = input.required<Recipe>();
  readonly size = input<'compact' | 'regular'>('regular');

  protected readonly stats = recipeStats;
}
