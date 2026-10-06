import { RecipeFilter } from './types/recipe-filter.model';
import { Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { RecipesStore } from './data-access/recipes-store';
import {
  filterRecipes,
  parseMinutes,
  parseQuery,
  toQueryParams,
} from './utils/recipe-filter';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { RecipesList } from './ui/recipes-list/recipes-list';

@Component({
  selector: 'app-recipes',
  imports: [RecipesFilters, RecipesList, MatButton, MatDivider],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes {
  private readonly filters = viewChild.required(RecipesFilters);
  private readonly pageHeading = viewChild.required<ElementRef<HTMLHeadingElement>>('pageHeading');
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
    this.filters().focusSearch();
  }

  protected retry(): void {
    this.store.reload();
    this.pageHeading().nativeElement.focus();
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
