import { NgOptimizedImage } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { PageFocus } from '../shared/data-access/page-focus';
import { PageHeading } from '../shared/directives/page-heading';
import { Reveal } from '../shared/directives/reveal';
import { Skeleton } from '../shared/ui/skeleton/skeleton';
import { pageTitle } from '../shared/utils/page-title';
import { RecipesStore } from './data-access/recipes-store';
import { MoreRecipes } from './ui/more-recipes/more-recipes';
import { RecipeBreadcrumb } from './ui/recipe-breadcrumb/recipe-breadcrumb';
import { RecipeDetailsSkeleton } from './ui/recipe-details-skeleton/recipe-details-skeleton';
import { RecipeStats } from './ui/recipe-stats/recipe-stats';
import { RecipeSteps } from './ui/recipe-steps/recipe-steps';
import { StateMessage } from './ui/state-message/state-message';

@Component({
  selector: 'app-recipe-details',
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatButton,
    MatDivider,
    PageHeading,
    Reveal,
    Skeleton,
    MoreRecipes,
    RecipeBreadcrumb,
    RecipeDetailsSkeleton,
    RecipeStats,
    RecipeSteps,
    StateMessage,
  ],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  private readonly title = inject(Title);
  private readonly pageFocus = inject(PageFocus);
  protected readonly store = inject(RecipesStore);

  readonly slug = input.required<string>();

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
    this.pageFocus.focusHeading();
  }
}
