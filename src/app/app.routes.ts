import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((c) => c.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((c) => c.About),
  },
  {
    path: 'recipes',
    loadChildren: () => [
      {
        path: '',
        loadComponent: () => import('./recipes/recipes').then((c) => c.Recipes),
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./recipes/recipe-details').then((c) => c.RecipeDetails),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
