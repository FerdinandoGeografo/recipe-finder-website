import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Reveal } from '../shared/directives/reveal';
import { Skeleton } from '../shared/ui/skeleton/skeleton';
import { pageTitle } from '../shared/utils/page-title';
import { injectFocusPageHeading } from '../shared/utils/route-focus';
import { skeletonSections } from './constants/detail-skeleton';
import { RecipesStore } from './data-access/recipes-store';
import { RecipeStats } from './ui/recipe-stats/recipe-stats';
import { RecipesList } from './ui/recipes-list/recipes-list';

@Component({
  selector: 'app-recipe-details',
  imports: [RouterLink, MatButton, MatDivider, MatIcon, Reveal, Skeleton, RecipeStats, RecipesList],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  private readonly title = inject(Title);
  private readonly focusPageHeading = injectFocusPageHeading();
  protected readonly store = inject(RecipesStore);

  readonly slug = input.required<string>();

  protected readonly skeletonSections = skeletonSections;

  protected readonly recipe = computed(() =>
    this.store.recipes().find((r) => r.slug === this.slug()),
  );

  // The three recipes that follow the current one, wrapping around the list.
  protected readonly moreRecipes = computed(() => {
    const recipes = this.store.recipes();
    const recipe = this.recipe();
    if (!recipe) return [];

    const index = recipes.indexOf(recipe);
    const length = Math.min(3, recipes.length - 1);
    return Array.from({ length }, (_, i) => recipes[(index + i + 1) % recipes.length]);
  });

  protected readonly pageName = computed(() => {
    const recipe = this.recipe();
    if (recipe) return recipe.title;

    switch (this.store.status()) {
      case 'loading':
        return 'Recipe';
      case 'error':
        return 'Recipe unavailable';
      default:
        return 'Recipe not found';
    }
  });

  constructor() {
    // Title is an imperative browser API, so an effect keeps it in sync.
    effect(() => this.title.setTitle(pageTitle(this.pageName())));
  }

  protected retry(): void {
    this.store.reload();
    this.focusPageHeading();
  }
}
