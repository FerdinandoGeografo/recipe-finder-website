import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((c) => c.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((c) => c.About),
  },
  {
    path: 'recipes',
    loadComponent: () => import('./recipes/recipes').then((c) => c.Recipes),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
