import { Component } from '@angular/core';
import { Skeleton } from '../../../shared/ui/skeleton/skeleton';

@Component({
  selector: 'app-recipe-card-skeleton',
  imports: [Skeleton],
  templateUrl: './recipe-card-skeleton.html',
  // Shares the card stylesheet so the placeholder keeps the real geometry.
  styleUrl: '../recipe-card/recipe-card.scss',
})
export class RecipeCardSkeleton {}
