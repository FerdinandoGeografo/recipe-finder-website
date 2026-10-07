import { Component } from '@angular/core';
import { listSkeletonCards } from '../../constants/list-skeleton';
import { RecipeCardSkeleton } from '../recipe-card-skeleton/recipe-card-skeleton';

@Component({
  selector: 'app-recipes-list-skeleton',
  imports: [RecipeCardSkeleton],
  templateUrl: './recipes-list-skeleton.html',
  // Same grid as the real list.
  styleUrl: '../recipes-list/recipes-list.scss',
  host: {
    'aria-hidden': 'true',
  },
})
export class RecipesListSkeleton {
  protected readonly cards = listSkeletonCards;
}
