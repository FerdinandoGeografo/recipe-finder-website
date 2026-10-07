import { Component } from '@angular/core';
import { Skeleton } from '../../../shared/ui/skeleton/skeleton';
import { skeletonSections } from '../../constants/detail-skeleton';

@Component({
  selector: 'app-recipe-details-skeleton',
  imports: [Skeleton],
  templateUrl: './recipe-details-skeleton.html',
  styleUrl: './recipe-details-skeleton.scss',
  host: {
    'aria-hidden': 'true',
  },
})
export class RecipeDetailsSkeleton {
  protected readonly sections = skeletonSections;
}
