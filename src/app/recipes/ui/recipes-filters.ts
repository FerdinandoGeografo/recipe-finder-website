import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recipes-filters',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule],
  template: `
    <p>Max Prep Time</p>
    <p>Max Cook Time</p>

    <mat-form-field
      subscriptSizing="dynamic"
      appearance="outline"
      class="filters__search"
    >
      <input
        matInput
        type="text"
        placeholder="Search by name or ingredient..."
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
export class RecipesFilters {}
