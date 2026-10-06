import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { Reveal } from '../../../shared/directives/reveal';
import { Recipe } from '../../types/recipe.model';
import { RecipeStats } from '../recipe-stats/recipe-stats';

@Component({
  selector: 'app-recipes-list',
  imports: [NgOptimizedImage, RouterLink, MatButton, MatCard, MatCardActions, MatCardContent, Reveal, RecipeStats],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {
  readonly recipes = input.required<readonly Recipe[]>();
  readonly headingLevel = input<2 | 3>(2);
  // On the index the first row holds the largest images; under "More recipes" it does not.
  readonly prioritizeFirstRow = input(true);
}
