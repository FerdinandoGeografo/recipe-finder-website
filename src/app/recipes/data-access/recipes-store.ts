import { HttpContext, httpResource } from '@angular/common/http';
import { computed, isDevMode, Service } from '@angular/core';
import { REQUEST_DELAY_MS } from '../../shared/request-delay';
import { recipesApiConfig } from './recipes-api.config';
import { Recipe } from './recipe.model';

export type RecipesStatus = 'loading' | 'success' | 'error';

@Service()
export class RecipesStore {
  readonly #recipes = httpResource<Recipe[]>(() => ({
    url: 'data/data.json',
    context: new HttpContext().set(REQUEST_DELAY_MS, isDevMode() ? recipesApiConfig.delayMs : 0),
  }), {
    defaultValue: [],
  });

  // value() throws in the error state, so it is only read behind hasValue().
  readonly recipes = computed(() =>
    this.#recipes.hasValue() ? this.#recipes.value() : [],
  );

  readonly status = computed<RecipesStatus>(() => {
    switch (this.#recipes.status()) {
      case 'resolved':
      case 'local':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'loading';
    }
  });

  reload(): void {
    this.#recipes.reload();
  }
}
