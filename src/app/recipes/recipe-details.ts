import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RecipesStore } from './data-access/recipes-store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesList } from './ui/recipes-list/recipes-list';
import { pageTitle } from '../shared/page-title';

@Component({
  selector: 'app-recipe-details',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RecipesList,
  ],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  protected rs = inject(RecipesStore);
  #title = inject(Title);

  slug = input.required<string>();
  protected recipe = computed(() =>
    this.rs.recipes().find((r) => r.slug === this.slug()),
  );
  // The three recipes that follow the current one, wrapping around the list.
  protected moreRecipes = computed(() => {
    const recipes = this.rs.recipes();
    const recipe = this.recipe();
    if (!recipe) return [];

    const index = recipes.indexOf(recipe);
    const length = Math.min(3, recipes.length - 1);
    return Array.from(
      { length },
      (_, i) => recipes[(index + i + 1) % recipes.length],
    );
  });

  #pageName = computed(() => {
    const recipe = this.recipe();
    if (recipe) return recipe.title;

    switch (this.rs.status()) {
      case 'loading':
        return 'Recipe';
      case 'error':
        return 'Recipe unavailable';
      default:
        return 'Recipe not found';
    }
  });

  constructor() {
    effect(() => this.#title.setTitle(pageTitle(this.#pageName())));
  }
}
