import { InjectionToken } from '@angular/core';

export const recipesApiConfig = {
  delayMs: 1500,
} as const;

export const RECIPE_REQUEST_KEY = new InjectionToken<() => string | null>('Recipe request key', {
  providedIn: 'root',
  factory: () => () => null,
});
