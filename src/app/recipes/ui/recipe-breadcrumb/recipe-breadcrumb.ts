import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skeleton } from '../../../shared/ui/skeleton/skeleton';

@Component({
  selector: 'app-recipe-breadcrumb',
  imports: [RouterLink, Skeleton],
  templateUrl: './recipe-breadcrumb.html',
  styleUrl: './recipe-breadcrumb.scss',
})
export class RecipeBreadcrumb {
  readonly name = input.required<string>();
  readonly loading = input(false);
}
