import { Component, inject } from '@angular/core';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { RecipesStore } from './data-access/recipes-store';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesList } from './ui/recipes-list/recipes-list';

@Component({
  selector: 'app-recipes',
  imports: [RecipesFilters, RecipesList, MatDividerModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes {
  protected rs = inject(RecipesStore);
}
