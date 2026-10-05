import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((c) => c.Home),
    title: 'Frontend Mentor | Recipe finder website',
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((c) => c.About),
    title: 'Recipe finder website | About',
  },
  {
    path: 'recipes',
    loadChildren: () => [
      {
        path: '',
        loadComponent: () => import('./recipes/recipes').then((c) => c.Recipes),
        title: 'Recipe finder website | Recipes',
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./recipes/recipe-details').then((c) => c.RecipeDetails),
        title: 'Recipe finder website | Recipe',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
