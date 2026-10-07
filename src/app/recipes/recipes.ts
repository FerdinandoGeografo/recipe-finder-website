import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { PageFocus } from '../shared/data-access/page-focus';
import { PageHeading } from '../shared/directives/page-heading';
import { RecipesStore } from './data-access/recipes-store';
import { RecipeFilter } from './types/recipe-filter.model';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { RecipesList } from './ui/recipes-list/recipes-list';
import { RecipesListSkeleton } from './ui/recipes-list-skeleton/recipes-list-skeleton';
import { StateMessage } from './ui/state-message/state-message';
import { filterRecipes, parseMinutes, parseQuery, toQueryParams } from './utils/recipe-filter';

@Component({
  selector: 'app-recipes',
  imports: [MatButton, MatDivider, PageHeading, RecipesFilters, RecipesList, RecipesListSkeleton, StateMessage],
  templateUrl: './recipes.html',
  styleUrl: './recipes.scss',
})
export class Recipes {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly pageFocus = inject(PageFocus);
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

  // The unfiltered first row holds the largest images above the fold.
  protected readonly firstRowIds = computed(() => this.store.recipes().slice(0, 3).map((recipe) => recipe.id));

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
    this.pageFocus.focusHeading();
  }

  protected retry(): void {
    this.store.reload();
    this.pageFocus.focusHeading();
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
