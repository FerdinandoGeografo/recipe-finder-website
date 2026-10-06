import { Component, computed, inject, input, viewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { injectFocusPageHeading } from '../shared/utils/route-focus';
import { RecipesStore } from './data-access/recipes-store';
import { RecipeFilter } from './types/recipe-filter.model';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { RecipesList } from './ui/recipes-list/recipes-list';
import { RecipesListSkeleton } from './ui/recipes-list-skeleton/recipes-list-skeleton';
import { filterRecipes, parseMinutes, parseQuery, toQueryParams } from './utils/recipe-filter';

@Component({
  selector: 'app-recipes',
  imports: [MatButton, MatDivider, RecipesFilters, RecipesList, RecipesListSkeleton],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes {
  private readonly filters = viewChild.required(RecipesFilters);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly focusPageHeading = injectFocusPageHeading();
  protected readonly store = inject(RecipesStore);

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

  protected readonly recipes = computed(() => filterRecipes(this.store.recipes(), this.filter()));

  protected readonly resultsMessage = computed(() => {
    if (this.store.isLoading()) return 'Loading recipes…';
    if (this.store.status() !== 'success') return '';

    const count = this.recipes().length;
    return count === 1 ? '1 recipe found' : `${count} recipes found`;
  });

  protected updateFilter(change: Partial<RecipeFilter>): void {
    this.navigate(toQueryParams(change), 'merge');
  }

  protected clearFilters(): void {
    this.navigate({});
    this.filters().focusSearch();
  }

  protected retry(): void {
    this.store.reload();
    this.focusPageHeading();
  }

  // Filter changes replace the history entry and keep the scroll position.
  private navigate(queryParams: Params, queryParamsHandling?: 'merge'): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling,
      replaceUrl: true,
      scroll: 'manual',
    });
  }
}
