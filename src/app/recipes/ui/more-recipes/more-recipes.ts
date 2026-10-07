import { Component, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Reveal } from '../../../shared/directives/reveal';
import { Recipe } from '../../types/recipe.model';
import { RecipesList } from '../recipes-list/recipes-list';

@Component({
  selector: 'app-more-recipes',
  imports: [MatDivider, Reveal, RecipesList],
  templateUrl: './more-recipes.html',
  styleUrl: './more-recipes.scss',
})
export class MoreRecipes {
  readonly recipes = input.required<readonly Recipe[]>();
}
