import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent } from '@angular/material/card';
import { Recipe } from '../../types/recipe.model';
import { RecipeStats } from '../recipe-stats/recipe-stats';

@Component({
  selector: 'app-recipe-card',
  imports: [NgOptimizedImage, RouterLink, MatButton, MatCard, MatCardActions, MatCardContent, RecipeStats],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {
  readonly recipe = input.required<Recipe>();
  readonly headingLevel = input<2 | 3>(2);
  readonly priority = input(false);
}
