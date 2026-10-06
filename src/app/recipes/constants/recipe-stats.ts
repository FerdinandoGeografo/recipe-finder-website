import { RecipeStat } from '../types/recipe-stat.model';

export const recipeStats: readonly RecipeStat[] = [
  { icon: 'servings', label: 'Servings', field: 'servings', unit: '' },
  { icon: 'prep-time', label: 'Prep', field: 'prepMinutes', unit: ' mins' },
  { icon: 'cook-time', label: 'Cook', field: 'cookMinutes', unit: ' mins' },
];
