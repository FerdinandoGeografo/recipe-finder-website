import { Component, computed, inject } from '@angular/core';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { RecipesStore } from './data-access/recipes-store';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesList } from './ui/recipes-list/recipes-list';

@Component({
  selector: 'app-recipes',
  imports: [RecipesFilters, RecipesList, MatButtonModule, MatDividerModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes {
  protected rs = inject(RecipesStore);

  protected resultsMessage = computed(() => {
    if (this.rs.status() !== 'success') return '';

    const count = this.rs.filteredRecipes().length;
    return count === 1 ? '1 recipe found' : `${count} recipes found`;
  });
}
