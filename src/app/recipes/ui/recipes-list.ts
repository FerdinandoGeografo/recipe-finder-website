import { Component, input } from '@angular/core';
import { IRecipe } from '../data-access/recipes-store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipes-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  template: `
    <ul class="recipes__list">
      @for (recipe of recipes(); track recipe.id) {
      <li class="recipe">
        <mat-card appearance="outlined" class="recipe__card">
          <img
            class="recipe__img"
            mat-card-image
            [src]="recipe.image.large"
            [alt]="recipe.title"
          />
          <mat-card-content class="recipe__card-content">
            <div class="recipe__info">
              <div class="recipe__box">
                <h2 class="recipe__title">{{ recipe.title }}</h2>
                <p class="recipe__description heading heading--xs">
                  {{ recipe.overview }}
                </p>
              </div>
              <div class="recipe__details">
                <div class="recipe__detail">
                  <mat-icon class="recipe__icon" svgIcon="custom:servings" />
                  <span class="recipe__value heading heading--xs">
                    Servings: {{ recipe.servings }}
                  </span>
                </div>
                <div class="recipe__detail">
                  <mat-icon class="recipe__icon" svgIcon="custom:prep-time" />
                  <span class="recipe__value heading heading--xs">
                    Prep: {{ recipe.prepMinutes }} mins
                  </span>
                </div>
                <div class="recipe__detail">
                  <mat-icon class="recipe__icon" svgIcon="custom:cook-time" />
                  <span class="recipe__value heading heading--xs">
                    Cook: {{ recipe.cookMinutes }} mins
                  </span>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions class="recipe__actions">
            <a matButton="filled" routerLink=".">View Recipe</a>
          </mat-card-actions>
        </mat-card>
      </li>
      }
    </ul>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      .recipes {
        &__list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3.2rem;
        }
      }

      .recipe {
        &__card {
          padding: 7px;
          max-width: 37.6rem;

          @include mat.card-overrides((
            outlined-container-shape: 1rem,
            outlined-outline-width: 1px,
            outlined-outline-color: var(--neutral-300),
            outlined-container-elevation: 0 8px 16px -9px rgba(22, 58, 52, 16%),
            outlined-container-color: var(--neutral-0),
          ));
        }

        &__img {
          width: 100%;
          max-height: 30rem;
          border-radius: inherit;
        }

        &__card-content {
          padding: 1.6rem 0;
        }

        &__info {
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
          padding: 0 8px;
        }

        &__box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        &__title {
          font-size: 2rem;
          line-height: 2.8rem;
          letter-spacing: -.5px;
          font-weight: 700;
          color: var(--neutral-900);
        }

        &__description {
          color: var(--neutral-800);
        }

        &__details {
          display: flex;
          align-items: center;
          column-gap: 1.6rem;
          row-gap: 8px;
          flex-wrap: wrap;
        }

        &__detail {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        &__icon {
          width: 2rem;
          height: 2rem;
        }

        &__value {
          color: var(--neutral-900);
        }

        &__actions {
          a { flex: 1; }

          @include mat.button-overrides((
            filled-container-shape: var(--mat-sys-corner-full),
            filled-container-height: 4.8rem,
            filled-touch-target-display: 4.8rem,
            filled-label-text-font: var(--ff-sans),
            filled-label-text-size: 1.6rem,
            filled-label-text-tracking: -.3px,
          ));
        }
      }
    }
  `,
})
export class RecipesList {
  recipes = input.required<IRecipe[]>();
}
