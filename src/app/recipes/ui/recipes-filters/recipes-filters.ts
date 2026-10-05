import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { Filter } from '../../data-access/recipes-store';

@Component({
  selector: 'app-recipes-filters',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
  ],
  template: `
    <button matButton="outlined" [matMenuTriggerFor]="prepTimeMenu">
      Max Prep Time
      <mat-icon svgIcon="custom:chevron-down" />
    </button>

    <mat-menu #prepTimeMenu="matMenu">
      <mat-radio-group
        aria-labelledby="Max cook time group options"
        [ngModel]="maxPrepTime()"
        (ngModelChange)="update({ maxPrepTime: $event })"
      >
        <mat-radio-button [value]="0">0 minutes</mat-radio-button>
        <mat-radio-button [value]="5">5 minutes</mat-radio-button>
        <mat-radio-button [value]="10">10 minutes</mat-radio-button>
      </mat-radio-group>
      <button matButton="outlined" (click)="update({ maxPrepTime: undefined })">
        Clear
      </button>
    </mat-menu>

    <button matButton="outlined" [matMenuTriggerFor]="cookTimeMenu">
      <mat-icon svgIcon="custom:chevron-down" />
      Max Cook Time
    </button>

    <mat-menu #cookTimeMenu="matMenu">
      <mat-radio-group
        aria-labelledby="Max cook time group options"
        [ngModel]="maxCookTime()"
        (ngModelChange)="update({ maxCookTime: $event })"
      >
        <mat-radio-button [value]="0">0 minutes</mat-radio-button>
        <mat-radio-button [value]="5">5 minutes</mat-radio-button>
        <mat-radio-button [value]="10">10 minutes</mat-radio-button>
        <mat-radio-button [value]="15">15 minutes</mat-radio-button>
        <mat-radio-button [value]="20">20 minutes</mat-radio-button>
      </mat-radio-group>
      <button matButton="outlined" (click)="update({ maxCookTime: undefined })">
        Clear
      </button>
    </mat-menu>

    <mat-form-field
      subscriptSizing="dynamic"
      appearance="outline"
      class="filters__search"
    >
      <input
        matInput
        type="text"
        placeholder="Search by name or ingredient..."
        [ngModel]="query()"
        (ngModelChange)="update({ query: $event })"
      />
      <mat-icon matPrefix svgIcon="custom:search" />
    </mat-form-field>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.6rem;

      .filters {
        &__search {
          margin-left: auto;
        }
      }
    }
  `,
})
export class RecipesFilters {
  maxPrepTime = input<number>();
  maxCookTime = input<number>();
  query = input<string>();

  filterChanged = output<Filter>();

  // Emits only on user changes; an explicit undefined in the patch clears that filter.
  protected update(patch: Filter) {
    this.filterChanged.emit({
      maxPrepTime: this.maxPrepTime(),
      maxCookTime: this.maxCookTime(),
      query: this.query(),
      ...patch,
    });
  }
}
