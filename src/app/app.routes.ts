import { Routes } from '@angular/router';
import { pageTitle } from './shared/utils/page-title';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((c) => c.Home),
    title: pageTitle('Home'),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((c) => c.About),
    title: pageTitle('About'),
  },
  {
    path: 'recipes',
    loadChildren: () => [
      {
        path: '',
        loadComponent: () => import('./recipes/recipes').then((c) => c.Recipes),
        title: pageTitle('Recipes'),
      },
      {
        // No static title: RecipeDetails sets it from the loaded recipe.
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
