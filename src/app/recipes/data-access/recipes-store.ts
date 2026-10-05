import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesStore {
  #http = inject(HttpClient);
  #state = signal<RecipesState>(initialState);

  loading = computed(() => this.#state().loading);
  recipes = computed(() => this.#state().recipes);
  filter = computed(() => this.#state().filter);

  filteredRecipes = computed(() =>
    filterRecipes(this.recipes(), this.filter()),
  );

  #loadRecipes$ = new Subject<void>();

  constructor() {
    this.#loadRecipes$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.#state.update((s) => ({ ...s, loading: true }))),
        switchMap(() =>
          this.#http.get<IRecipe[]>('data/data.json').pipe(
            tap((recipes) =>
              this.#state.update((s) => ({ ...s, recipes, loading: false }))
            )
          )
        )
      )
      .subscribe();

    this.#loadRecipes$.next();
  }

  setFilter(filter: Filter) {
    this.#state.update((s) => ({
      ...s,
      filter: { ...filter },
    }));
  }
}

interface RecipesState {
  loading: boolean;
  recipes: IRecipe[];
  filter: Filter;
}

export interface IRecipe {
  id: number;
  title: string;
  slug: string;
  image: {
    large: string;
    small: string;
  };
  overview: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: string[];
  instructions: string[];
}

export interface Filter {
  maxPrepTime?: number;
  maxCookTime?: number;
  query?: string;
}

// Max times are inclusive and 0 is a real limit; only undefined means "any".
export function filterRecipes(
  recipes: IRecipe[],
  { maxPrepTime, maxCookTime, query }: Filter,
): IRecipe[] {
  const q = query?.trim().toLowerCase() ?? '';

  return recipes.filter(
    (r) =>
      (maxPrepTime === undefined || r.prepMinutes <= maxPrepTime) &&
      (maxCookTime === undefined || r.cookMinutes <= maxCookTime) &&
      (!q ||
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))),
  );
}

const initialState: RecipesState = {
  loading: false,
  recipes: [],
  filter: {},
};
