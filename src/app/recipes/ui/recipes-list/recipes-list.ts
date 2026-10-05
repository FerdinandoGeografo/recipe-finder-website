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
}
