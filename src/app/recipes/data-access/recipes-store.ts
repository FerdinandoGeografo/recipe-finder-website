import { HttpContext, httpResource } from '@angular/common/http';
import { computed, isDevMode, Service } from '@angular/core';
import { REQUEST_DELAY_MS } from '../../shared/constants/request-delay';
import { recipesApiConfig } from '../constants/recipes-api.config';
import { Recipe } from '../types/recipe.model';
import { RecipesStatus } from '../types/recipes-status';

@Service()
export class RecipesStore {
  private readonly resource = httpResource<Recipe[]>(
    () => ({
      url: 'data/data.json',
      context: new HttpContext().set(REQUEST_DELAY_MS, isDevMode() ? recipesApiConfig.delayMs : 0),
    }),
    { defaultValue: [] },
  );

  // value() throws in the error state, so it is only read behind hasValue().
  readonly recipes = computed(() => (this.resource.hasValue() ? this.resource.value() : []));

  readonly status = computed<RecipesStatus>(() => {
    switch (this.resource.status()) {
      case 'resolved':
      case 'local':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'loading';
    }
  });

  readonly isLoading = computed(() => this.status() === 'loading');

  reload(): void {
    this.resource.reload();
  }
}
