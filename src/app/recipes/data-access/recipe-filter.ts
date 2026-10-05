import { Params } from '@angular/router';
import { Recipe } from './recipe.model';

export interface RecipeFilter {
  query: string;
  maxPrepTime?: number;
  maxCookTime?: number;
}

// Max times are inclusive and 0 is a real limit; only undefined means "any".
export function filterRecipes(
  recipes: readonly Recipe[],
  { query, maxPrepTime, maxCookTime }: RecipeFilter,
): Recipe[] {
  const q = query.trim().toLowerCase();

  return recipes.filter(
    (r) =>
      (maxPrepTime === undefined || r.prepMinutes <= maxPrepTime) &&
      (maxCookTime === undefined || r.cookMinutes <= maxCookTime) &&
      (!q ||
        r.title.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q))),
  );
}

export function parseQuery(value: string | undefined): string {
  return value ?? '';
}

// Anything but a whole number of minutes means "any".
export function parseMinutes(value: string | undefined): number | undefined {
  return value !== undefined && /^\d+$/.test(value) ? Number(value) : undefined;
}

// Keys match the Recipes page inputs. null removes a key when merged into the current URL.
export function toQueryParams(change: Partial<RecipeFilter>): Params {
  const params: Params = {};
  if ('query' in change) params['q'] = change.query || null;
  if ('maxPrepTime' in change) params['maxPrep'] = change.maxPrepTime ?? null;
  if ('maxCookTime' in change) params['maxCook'] = change.maxCookTime ?? null;
  return params;
}
