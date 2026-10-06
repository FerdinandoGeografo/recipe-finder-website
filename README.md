# Frontend Mentor - Recipe finder website solution

This is a solution to the [Recipe finder website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/recipe-finder-website--Ui-TZTPxN). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Application behaviour](#application-behaviour)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the Home, About, Recipes index and Recipe Details pages.
- Search for recipes by name or ingredient.
- Filter recipes by maximum prep or cook time.
- View the optimal layout for their device's screen size.
- See hover and focus states for interactive elements.
- Navigate the menus and recipe links with the keyboard.

### Application behaviour

- Search ignores case and surrounding whitespace. Prep and cook filters can be combined, and their limits are inclusive, including zero minutes.
- Filters live in the URL as `q`, `maxPrep` and `maxCook`. Refresh and shared links restore them; changes replace the current history entry and preserve the scroll position.
- The app reads eight recipes from the supplied static dataset. Once loaded, those recipes are shared between the index, details and related recipes without additional requests.
- Opening a detail URL directly or refreshing it loads the dataset and shows a skeleton. Navigating from an already loaded list opens the detail immediately.
- Each detail shows ingredients, instructions and three more recipes. The Recipes breadcrumb opens the unfiltered index; browser Back restores the previous filtered URL.
- Empty results, request errors with retry, and unknown recipe slugs have dedicated states.
- On smaller screens, navigation and filter controls use Angular Material menus. Arrow keys move between items, Enter selects, Escape closes and returns focus, and Tab exits the menu. The filter's Clear action is also a menu item.
- Route changes focus the page heading. View Transitions respect reduced motion and skip filter-only URL changes.

Recipe card titles stay complete, and search results follow the actual dataset rather than the illustrative results in the design.

### Links

- Solution URL: [GitHub Repository](https://github.com/FerdinandoGeografo/recipe-finder-website)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- SASS / SCSS and BEM
- CSS Grid, Flexbox and container-relative units
- Mobile-first responsive layouts
- Self-hosted Nunito and Nunito Sans fonts
- View Transitions API for route changes
- [TypeScript](https://www.typescriptlang.org/) 6.0.3
- [Angular](https://angular.dev/) 22.2.1, standalone components and zoneless change detection
- [Angular Material & CDK](https://material.angular.dev/) 22.2.1
- [RxJS](https://rxjs.dev/) for the cancellable development request delay

### What I learned

I kept a feature-based structure: `home`, `about` and `recipes` contain the routed pages and their `ui` components. Recipe models, filtering and remote state live in `recipes/data-access`, while the shell, focus handling and routing utilities live in `shared`.

#### A shared resource store

The dataset belongs to a single `RecipesStore`, declared with Angular 22's `@Service()` decorator. It uses `httpResource` for loading, success and error states, and `computed` for the values exposed to components. Resource values are only read behind `hasValue()`, because reading a failed resource can throw:

```ts
readonly recipes = computed(() =>
  this.#recipes.hasValue() ? this.#recipes.value() : [],
);
```

Keeping the store shared also makes loading behaviour predictable: direct entry needs a request, while navigation between recipes reuses the data already in memory. Retry calls the resource's `reload()` method instead of maintaining a separate loading flag.

#### The URL as the filter state

Router component input binding maps query parameters to signal inputs. Transforms normalise search text and parse minute limits; the filtered recipes are derived with `computed`, using a pure filtering function.

```ts
readonly q = input('', { transform: parseQuery });
readonly maxPrep = input<number | undefined, string | undefined>(undefined, {
  transform: parseMinutes,
});

protected readonly recipes = computed(() =>
  filterRecipes(this.store.recipes(), this.filter()),
);
```

There is no second filter state to synchronise with the router and no effect copying values between signals. Search, menu selection, refresh and browser history all use the same URL state.

#### Reusing Material components

The header and filters use `MatMenu` with native links or buttons as menu items. Material handles the menu's keyboard navigation, closing and focus restoration. The selection circles in the filter menu are decorative indicators, with the selected state included in the item's accessible name.

I used the Material styling mixins for component tokens and scoped the remaining overrides to the header or filter panel. Signal inputs, outputs and view queries keep the surrounding Angular components small.

#### Measuring the responsive design

The shared SCSS partials live in `src/styles`, which is included in Angular's Sass search paths. Components reuse named breakpoints, layout gutters, typography and motion tokens.

Some image masks scale with their container in the design. Container-relative units preserve those proportions between the reference widths:

```scss
.hero__picture {
  container-type: inline-size;
}

.hero__img {
  border-radius: calc(100cqw * 12 / 1192);
}
```

Text decorations use separate rounded pseudo-elements so their corner radius belongs to the coloured shape itself. Layout measurements also helped find small differences in line heights, grid columns and icon spacing.

#### Loading and motion

A functional HTTP interceptor adds a configurable, cancellable delay during development. It delays only actual dataset requests, leaving cached navigation immediate. Production requests have no artificial delay.

Page transitions use the router's View Transitions integration, with the initial transition and query-only transitions skipped. Reduced motion disables transitions and skeleton animation, including the View Transition pseudo-elements. Keyboard focus uses `:focus-visible`, with an outline fallback in forced colors.

### Useful resources

- [Reactive data fetching with httpResource](https://angular.dev/guide/http/http-resource) - Resource state, guarded value reads and reactive HTTP requests.
- [Common routing tasks](https://angular.dev/guide/routing/common-router-tasks) - Binding route and query parameters to component inputs.
- [Angular Material menus](https://material.angular.dev/components/menu/overview) - Menu items, keyboard behaviour and focus management.
- [Route transition animations](https://angular.dev/guide/routing/route-transition-animations) - The router's View Transitions integration.
- [Angular deployment](https://angular.dev/tools/cli/deployment#routed-apps-must-fall-back-to-indexhtml) - Serving routed applications with an `index.html` fallback.

### AI Collaboration

I used Claude Code and Codex as pair programmers for the Angular upgrade, implementation, reviews and visual polish, while keeping the product decisions and final review on my side.

- **Small checkpoints:** work progressed through feature branches with focused commits, builds and local review before merging.
- **Explicit decisions:** state ownership, Material component reuse, fonts and loading behaviour were reviewed as the implementation developed.
- **Browser checks:** temporary scripts checked rendered measurements, keyboard interactions, data states and motion without adding a test suite to the project.

## Author

- Frontend Mentor - [@FerdinandoGeografo](https://www.frontendmentor.io/profile/FerdinandoGeografo)
- LinkedIn - [@FerdinandoGeografo](https://www.linkedin.com/in/ferdinandogeografo/)
- GitHub - [@FerdinandoGeografo](https://github.com/FerdinandoGeografo/)
