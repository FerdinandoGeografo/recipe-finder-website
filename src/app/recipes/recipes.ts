import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesStore } from './data-access/recipes-store';
import {
  filterRecipes,
  parseMinutes,
  parseQuery,
  RecipeFilter,
  toQueryParams,
} from './data-access/recipe-filter';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { RecipesList } from './ui/recipes-list/recipes-list';

@Component({
  selector: 'app-recipes',
  imports: [RecipesFilters, RecipesList, MatButtonModule, MatDividerModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes {
  protected readonly store = inject(RecipesStore);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  // Query params bound by withComponentInputBinding: the URL is the only filter state.
  readonly q = input('', { transform: parseQuery });
  readonly maxPrep = input<number | undefined, string | undefined>(undefined, {
    transform: parseMinutes,
  });
  readonly maxCook = input<number | undefined, string | undefined>(undefined, {
    transform: parseMinutes,
  });

  protected readonly filter = computed<RecipeFilter>(() => ({
    query: this.q(),
    maxPrepTime: this.maxPrep(),
    maxCookTime: this.maxCook(),
  }));

  protected readonly recipes = computed(() =>
    filterRecipes(this.store.recipes(), this.filter()),
  );

  protected readonly resultsMessage = computed(() => {
    if (this.store.status() === 'loading') return 'Loading recipes…';
    if (this.store.status() !== 'success') return '';

    const count = this.recipes().length;
    return count === 1 ? '1 recipe found' : `${count} recipes found`;
  });

  protected updateFilter(change: Partial<RecipeFilter>): void {
    this.#navigate(toQueryParams(change), 'merge');
  }

  protected clearFilters(): void {
    this.#navigate({});
  }

  // Filter changes replace the history entry and keep the scroll position.
  #navigate(queryParams: Params, queryParamsHandling?: 'merge'): void {
    this.#router.navigate([], {
      relativeTo: this.#route,
      queryParams,
      queryParamsHandling,
      replaceUrl: true,
      scroll: 'manual',
    });
  }
}
