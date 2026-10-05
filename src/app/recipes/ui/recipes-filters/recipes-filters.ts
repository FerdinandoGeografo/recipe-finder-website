import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { RecipeFilter } from '../../data-access/recipe-filter';

@Component({
  selector: 'app-recipes-filters',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
  ],
  templateUrl: './recipes-filters.html',
  styleUrl: './recipes-filters.scss',
})
export class RecipesFilters {
  readonly filter = input.required<RecipeFilter>();

  // Emits only what the user changed; undefined clears that filter.
  readonly filterChange = output<Partial<RecipeFilter>>();

  protected readonly prepTimes = [0, 5, 10];
  protected readonly cookTimes = [0, 5, 10, 15, 20];
}
