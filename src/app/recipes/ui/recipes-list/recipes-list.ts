import { Skeleton } from '../../../shared/ui/skeleton/skeleton';
import { Reveal } from '../../../shared/directives/reveal';
import { skeletons } from '../../constants/list-skeleton';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Recipe } from '../../types/recipe.model';

@Component({
  selector: 'app-recipes-list',
  imports: [Skeleton, Reveal, MatCard, MatCardContent, MatCardActions, MatButton, MatIcon, RouterLink],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {
  readonly recipes = input.required<readonly Recipe[]>();
  readonly loading = input(false);
  readonly headingLevel = input<2 | 3>(2);

  protected readonly skeletons = skeletons;
}
