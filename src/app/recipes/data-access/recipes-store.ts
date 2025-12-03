import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
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

  filteredRecipes = computed(() => {
    const { maxCookTime, maxPrepTime, query } = this.filter();
    return this.recipes().filter((r) => {
      return (
        (!maxCookTime || r.cookMinutes <= maxCookTime) &&
        (!maxPrepTime || r.prepMinutes <= maxPrepTime) &&
        (!query ||
          r.title.includes(query) ||
          r.ingredients.join(' ').includes(query))
      );
    });
  });

  #loadRecipes$ = new Subject<void>();

  constructor() {
    effect(() => console.log('State changed:\t', this.#state()));

    this.#loadRecipes$
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.#state.update((s) => ({ ...s, loading: true }))),
        switchMap(() =>
          this.#http.get<IRecipe[]>('data/data.json').pipe(
            tap(console.log),
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

const initialState: RecipesState = {
  loading: false,
  recipes: [],
  filter: {},
};
