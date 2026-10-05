import { Component, computed, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { RecipesStore } from './data-access/recipes-store';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesList } from './ui/recipes-list/recipes-list';

@Component({
  selector: 'app-recipe-details',
  imports: [MatIconModule, MatDividerModule, RecipesList],
  templateUrl: './recipe-details.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './recipe-details.scss',
})
export class RecipeDetails {
  protected rs = inject(RecipesStore);

  slug = input.required<string>();
  recipe = computed(() =>
    this.rs.recipes().find((r) => r.slug === this.slug()),
  );
  moreRecipes = computed(() => {
    const recipeIndex = this.rs
      .recipes()
      .findIndex((r) => r.id === this.recipe()!.id);
    const recipeLength = this.rs.recipes().length;

    return Array.from({ length: 3 }).map(
      (el, i) => this.rs.recipes()[(recipeIndex + i + 1) % recipeLength],
    );
  });

  constructor() {
    effect(() =>
      console.log({
        slug: this.slug(),
        recipe: this.recipe(),
        moreRecipes: this.moreRecipes(),
      }),
    );
  }
}
