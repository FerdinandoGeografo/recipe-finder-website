import { Component, input } from '@angular/core';
import { IRecipe } from '../../data-access/recipes-store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipes-list',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {
  recipes = input.required<IRecipe[]>();
}
