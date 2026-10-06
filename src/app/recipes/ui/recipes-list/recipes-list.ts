import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../../data-access/recipe.model';

@Component({
  selector: 'app-recipes-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {
  readonly recipes = input.required<readonly Recipe[]>();
  readonly loading = input(false);
  readonly headingLevel = input<2 | 3>(2);

  protected readonly skeletons = [0, 1, 2, 3, 4, 5] as const;
}
