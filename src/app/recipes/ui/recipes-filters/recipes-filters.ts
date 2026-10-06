import { timeFilters } from '../../constants/time-filters';
import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RecipeFilter, TimeFilterKey } from '../../types/recipe-filter.model';

@Component({
  selector: 'app-recipes-filters',
  imports: [
    MatButton,
    MatFormField,
    MatPrefix,
    MatIcon,
    MatInput,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './recipes-filters.html',
  styleUrl: './recipes-filters.scss',
})
export class RecipesFilters {
  private readonly search = viewChild.required<
    MatInput,
    ElementRef<HTMLInputElement>
  >(MatInput, { read: ElementRef });

  readonly filter = input.required<RecipeFilter>();
  readonly disabled = input(false);
  readonly filterChange = output<Partial<RecipeFilter>>();

  protected readonly timeFilters = timeFilters;

  focusSearch(): void {
    this.search().nativeElement.focus();
  }

  protected selectTime(key: TimeFilterKey, minutes?: number): void {
    if (this.disabled()) return;
    this.filterChange.emit({ [key]: minutes });
  }

  protected searchRecipes(event: Event): void {
    if (this.disabled()) return;
    this.filterChange.emit({ query: (event.target as HTMLInputElement).value });
  }
}
