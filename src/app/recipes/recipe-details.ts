import { Component, computed, effect, inject, input } from '@angular/core';
import { RecipesStore } from './data-access/recipes-store';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RecipesList } from './ui/recipes-list';

@Component({
  selector: 'app-recipe-details',
  imports: [MatIconModule, MatDividerModule, RecipesList],
  template: `
    <section class="recipe__details">
      <div class="recipe__breadcrumbs">
        <span class="heading heading--sm">Recipes</span>
        <span class="heading heading--sm">/</span>
        <span class="heading heading--sm">{{ recipe()?.title }}</span>
      </div>

      <div class="recipe__content">
        <img
          class="recipe__img"
          [src]="recipe()?.image?.large"
          [alt]="recipe()?.title"
        />

        <div class="recipe__info">
          <h1 class="heading heading--2xl">{{ recipe()?.title }}</h1>
          <p class="heading heading--md">{{ recipe()?.overview }}</p>
          <div class="recipe__stats">
            <div class="recipe__data">
              <mat-icon class="recipe__icon" svgIcon="custom:servings" />
              <span class="heading heading--sm recipe__value">
                Servings: {{ recipe()?.servings }}
              </span>
            </div>
            <div class="recipe__data">
              <mat-icon class="recipe__icon" svgIcon="custom:prep-time" />
              <span class="heading heading--sm recipe__value">
                Prep: {{ recipe()?.prepMinutes }} mins
              </span>
            </div>
            <div class="recipe__data">
              <mat-icon class="recipe__icon" svgIcon="custom:cook-time" />
              <span class="heading heading--sm recipe__value">
                Cook: {{ recipe()?.cookMinutes }} mins
              </span>
            </div>
          </div>
          <div class="recipe__list-box">
            <h2 class="recipe__list-title">Ingredients</h2>
            <ul class="recipe__list">
              @for (ingredient of recipe()?.ingredients; track $index) {
              <li class="recipe__item">
                <mat-icon
                  class="recipe__list-icon"
                  svgIcon="custom:bullet-point"
                />
                <p class="recipe__text">{{ ingredient }}</p>
              </li>
              }
            </ul>
          </div>
          <div class="recipe__list-box">
            <h2 class="recipe__list-title">Instructions</h2>
            <ul class="recipe__list">
              @for (instruction of recipe()?.instructions; track $index) {
              <li class="recipe__item">
                <mat-icon
                  class="recipe__list-icon"
                  svgIcon="custom:bullet-point"
                />
                <p class="recipe__text">
                  {{ instruction }}
                </p>
              </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
    <mat-divider />
    <section class="recipe__more">
      <h2 class="heading heading--lg">More recipes</h2>
      <app-recipes-list [recipes]="moreRecipes()" />
    </section>
    <mat-divider />
  `,
  styles: `
    :host {
      .recipe {
        &__details {
          padding: 4.8rem 12.4rem 6.4rem;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        &__breadcrumbs {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--neutral-900);

          span {
            opacity: .6;
          }

          span:last-child {
            opacity: 1;
          }
        }

        &__content {
          display: flex;
          align-items: start;
          gap: 4rem;
        }

        &__img {
          border-radius: 1rem;
          max-width: 58rem;
        }

        &__info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        &__stats {
          display: flex;
          align-items: center;
          gap: 1.6rem;
        }

        &__data {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        &__icon {
          width: 2rem;
          height: 2rem;
        }

        &__value {
          color: var(--neutral-900);
        }

        &__list-box {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        &__list-title {
          font-size: 2.4rem;
          line-height: 3.1rem;
          letter-spacing: -1px;
          font-weight: 700;
          color: var(--neutral-900);
        }

        &__list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        &__item {
          display: flex;
          align-items: start;
          gap: 8px;
        }

        &__list-icon {
          margin-top: 3px;
          min-width: 2.4rem;
          height: 2.4rem;
        }

        &__text {
          font-family: var(--ff-sans);
          font-size: 2rem;
          line-height: 3rem;
          letter-spacing: -.4px;
          font-weight: 500;
          color: var(--neutral-800);
        }

        &__more {
          padding: 6.4rem 12.4rem 9.6rem;
          display: flex;
          flex-direction: column;
          gap: 2.4rem;
        }
      }
    }
  `,
})
export class RecipeDetails {
  protected rs = inject(RecipesStore);

  slug = input.required<string>();
  recipe = computed(() =>
    this.rs.recipes().find((r) => r.slug === this.slug())
  );
  moreRecipes = computed(() => {
    const recipeIndex = this.rs
      .recipes()
      .findIndex((r) => r.id === this.recipe()!.id);
    const recipeLength = this.rs.recipes().length;

    return Array.from({ length: 3 }).map(
      (el, i) => this.rs.recipes()[(recipeIndex + i + 1) % recipeLength]
    );
  });

  constructor() {
    effect(() =>
      console.log({
        slug: this.slug(),
        recipe: this.recipe(),
        moreRecipes: this.moreRecipes(),
      })
    );
  }
}
