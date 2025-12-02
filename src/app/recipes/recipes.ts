import { Component, inject } from '@angular/core';
import { RecipesFilters } from './ui/recipes-filters';
import { RecipesStore } from './data-access/recipes-store';
import { RecipesList } from './ui/recipes-list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-recipes',
  imports: [RecipesFilters, RecipesList, MatDividerModule],
  template: `
    <section class="hero">
      <h1 class="heading heading--2xl">Explore our simple, healthy recipes</h1>
      <p class="heading heading--md">
        Discover eight quick, whole-food dishes that fit real-life schedules and
        taste amazing. Use the search bar to find a recipe by name or
        ingredient, or simply scroll the list and let something delicious catch
        your eye.
      </p>
    </section>

    <section class="list">
      <app-recipes-filters />
      <app-recipes-list [recipes]="rs.recipes()" />
    </section>
    <mat-divider />
  `,
  styles: `
    :host {
      display: block;

      .hero {
        padding: 8rem 0 6.4rem;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        align-items: center;

        p {
          text-align: center;
          max-width: 72.8rem;
          flex: 1;
        }
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
        padding: 0 12.4rem 9.6rem;
      }
    }
  `,
})
export class Recipes {
  protected rs = inject(RecipesStore);
}
