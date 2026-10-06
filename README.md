# Healthy Recipe Finder

An Angular implementation of the [Recipe finder website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/recipe-finder-website--Ui-TZTPxN), featuring eight recipes and responsive Home, About, Recipes and Recipe Details pages.

## Features

- Search by recipe name or ingredient, ignoring case and surrounding whitespace.
- Combine inclusive maximum prep and cook time filters, including zero minutes.
- Keep filters in the URL (`q`, `maxPrep`, `maxCook`) for refresh, sharing and browser history.
- Browse recipe ingredients, instructions and three more recipes.
- Responsive navigation and filter menus built with Angular Material.
- Loading skeletons, empty results, error/retry and recipe-not-found states.
- Visible keyboard focus, page-heading focus after navigation, and reduced-motion support.

The app reads the supplied static dataset. Once loaded, the same data serves the list and details without additional requests. Entering a detail URL directly loads the dataset first. The Recipes breadcrumb opens the unfiltered list; browser Back restores the previous filtered URL.

## Stack

Angular 22.2.1, Angular Material/CDK 22.2.1, TypeScript 6.0.3 and SCSS. Components are standalone, routes load lazily, and the app uses zoneless change detection. Remote data lives in a shared `httpResource` store; component state uses signal inputs, outputs and computed values.

## Run locally

Verified with Node.js 24.15.0 and npm 11.12.1.

```sh
npm ci
npm start
```

Open [localhost:4200](http://localhost:4200). Available routes are `/home`, `/about`, `/recipes` and `/recipes/:slug`.

Development requests include a configurable 1500 ms delay so loading states can be inspected. Change `delayMs` in [`recipes-api.config.ts`](src/app/recipes/data-access/recipes-api.config.ts), or set it to `0` to disable the delay. Cached navigation stays immediate. The delay is disabled in production.

## Production build and hosting

```sh
npm run build
```

Serve the contents of `dist/recipe-finder-website/browser` from the site's root. The production build has a 500 kB initial-bundle warning budget.

Configure the host to serve `index.html` for application routes such as `/recipes/mediterranean-chickpea-salad`, while serving existing asset files normally. This allows direct links and refresh to work. See [Angular's deployment guide](https://angular.dev/tools/cli/deployment#routed-apps-must-fall-back-to-indexhtml).

## Project structure

```text
src/app/home/                 Home page and presentation components
src/app/about/                About page and presentation components
src/app/recipes/data-access/  Dataset store, models, filters and delay configuration
src/app/recipes/ui/           Recipe cards and filter controls
src/app/shared/               Shell, page titles, focus, motion and HTTP utilities
src/styles/                   Design tokens, responsive mixins and Material overrides
public/                       Recipe data, fonts, icons and images
```

## Verification

Production builds and Chrome browser checks cover navigation, URL filters, cached detail navigation, direct-entry loading, error/retry and unknown recipes. All four pages were checked at 375, 768, 1024, 1440 and 1920 px, including a 20 px browser default font. Additional checks cover reduced motion and keyboard focus in forced colors. The Karma target remains configured; this repository does not currently contain test suites.

Before publishing, check all four pages at 375, 768, 1024, 1440 and 1920 px, keyboard menus and focus return, a 20 px browser default font, reduced motion and forced colors. Screen-reader and physical-device checks are still outstanding.

## Credits

Implementation by [Ferdinando Geografo](https://github.com/FerdinandoGeografo). Design, recipe content and supplied assets by [Frontend Mentor](https://www.frontendmentor.io).
