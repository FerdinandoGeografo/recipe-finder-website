import { Component, computed, effect, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesFilters } from './ui/recipes-filters/recipes-filters';
import { Filter, RecipesStore } from './data-access/recipes-store';
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
  #router = inject(Router);
  #route = inject(ActivatedRoute);

  // Query params, bound by withComponentInputBinding: the URL is the source of the filter.
  q = input<string>();
  maxPrep = input<string>();
  maxCook = input<string>();

  protected resultsMessage = computed(() => {
    if (this.rs.status() !== 'success') return '';

    const count = this.rs.filteredRecipes().length;
    return count === 1 ? '1 recipe found' : `${count} recipes found`;
  });

  constructor() {
    effect(() =>
      this.rs.setFilter({
        query: this.q(),
        maxPrepTime: toMinutes(this.maxPrep()),
        maxCookTime: toMinutes(this.maxCook()),
      }),
    );
  }

  // The store updates at once so the search field never waits for the navigation;
  // replaceUrl keeps typing and picking filters out of the history.
  protected applyFilter(filter: Filter) {
    const { query, maxPrepTime, maxCookTime } = filter;
    this.rs.setFilter(filter);
    this.#router.navigate([], {
      relativeTo: this.#route,
      queryParams: { q: query || undefined, maxPrep: maxPrepTime, maxCook: maxCookTime },
      replaceUrl: true,
    });
  }
}

function toMinutes(value: string | undefined): number | undefined {
  return value !== undefined && /^\d+$/.test(value) ? Number(value) : undefined;
}
