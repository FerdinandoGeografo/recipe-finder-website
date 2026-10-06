import { Recipe } from './recipe.model';

export interface RecipeStat {
  icon: string;
  label: string;
  field: keyof Pick<Recipe, 'servings' | 'prepMinutes' | 'cookMinutes'>;
  unit: string;
}
