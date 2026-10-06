export interface RecipeFilter {
  query: string;
  maxPrepTime?: number;
  maxCookTime?: number;
}

export type TimeFilterKey = 'maxPrepTime' | 'maxCookTime';
