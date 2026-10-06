import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RecipeFilter } from '../../data-access/recipe-filter';

type TimeFilterKey = 'maxPrepTime' | 'maxCookTime';

@Component({
  selector: 'app-recipes-filters',
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule],
  templateUrl: './recipes-filters.html',
  styleUrl: './recipes-filters.scss',
})
export class RecipesFilters {
  private readonly search = viewChild.required<MatInput, ElementRef<HTMLInputElement>>(
    MatInput, { read: ElementRef },
  );

  readonly filter = input.required<RecipeFilter>();
  readonly filterChange = output<Partial<RecipeFilter>>();

  protected readonly timeFilters = [
    { key: 'maxPrepTime', label: 'Max Prep Time', options: [0, 5, 10] },
    { key: 'maxCookTime', label: 'Max Cook Time', options: [0, 5, 10, 15, 20] },
  ] as const;

  focusSearch(): void {
    this.search().nativeElement.focus();
  }

  protected selectTime(key: TimeFilterKey, minutes?: number): void {
    this.filterChange.emit({ [key]: minutes });
  }

  protected searchRecipes(event: Event): void {
    this.filterChange.emit({ query: (event.target as HTMLInputElement).value });
  }
}
