import { Component } from '@angular/core';
import { Skeleton } from '../../../shared/ui/skeleton/skeleton';
import { listSkeletonCards } from '../../constants/list-skeleton';

@Component({
  selector: 'app-recipes-list-skeleton',
  imports: [Skeleton],
  templateUrl: './recipes-list-skeleton.html',
  // Shares the card layout so the placeholders keep the real geometry.
  styleUrl: '../recipes-list/recipes-list.scss',
  host: {
    'aria-hidden': 'true',
  },
})
export class RecipesListSkeleton {
  protected readonly cards = listSkeletonCards;
}
