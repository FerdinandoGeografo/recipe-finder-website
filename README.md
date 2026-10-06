# Frontend Mentor - Recipe finder website solution

This is a solution to the [Recipe finder website challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/recipe-finder-website--Ui-TZTPxN). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Application behaviour](#application-behaviour)
  - [Screenshot](#screenshot)
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
- Sections and recipe cards fade up once as they reach the viewport. Keyboard focus shows them at once, and content already scrolled past (for example after browser Back) is shown without motion.

Recipe card titles stay complete, and search results follow the actual dataset rather than the illustrative results in the design.

### Screenshot

<!-- Add the final screenshots, for example:
![Home | Desktop](./screenshots/home-desktop.png)
![Recipes | Tablet](./screenshots/recipes-tablet.png)
![Recipe details | Mobile](./screenshots/details-mobile.png)
-->

### Links

- Solution URL: [GitHub Repository](https://github.com/FerdinandoGeografo/recipe-finder-website)
- Live Site URL: [Recipe Finder](#)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- SASS / SCSS | BEM
- CSS Grid, Flexbox and container-relative units
- Mobile-first workflow
- Native CSS animations via `animate.enter` / `animate.leave`
- View Transitions API for route changes
- Intersection Observer API for the viewport reveal
- [TypeScript](https://www.typescriptlang.org/) - JS superset
- [Angular (v22)](https://angular.dev/) - Frontend Typescript Framework
- [Angular Material & CDK](https://material.angular.dev/) - UI Components libraries
- [RxJS](https://rxjs.dev/) - For the cancellable development request delay

### What I learned

I kept my usual feature-based folder structure: `home`, `about` and `recipes` contain the routed pages and their `ui` folder of presentational components. State lives in `data-access`; models, static definitions and pure helpers live in each feature’s `types`, `constants` and `utils` folders. The shell, the shared directives and the routing utilities follow the same structure in `shared`.

#### A shared resource store

The dataset belongs to a single `RecipesStore`, declared with Angular 22's `@Service()` decorator. It uses `httpResource` for loading, success and error states, and `computed` for the values exposed to components. Resource values are only read behind `hasValue()`, because reading a failed resource can throw:

```ts
readonly recipes = computed(() => (this.resource.hasValue() ? this.resource.value() : []));
readonly isLoading = computed(() => this.status() === 'loading');
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

Components import only the Material directives and components they use, such as `MatIcon`, `MatButton` and `MatMenu`. The header and filters use `MatMenu` with native links or buttons as menu items. Material handles the menu's keyboard navigation, closing and focus restoration. The selection circles in the filter menu are decorative indicators, with the selected state included in the item's accessible name.

I used the Material styling mixins for component tokens, with header and filter variants together in `_menu.scss`. Signal inputs, outputs and view queries keep the surrounding Angular components small.

#### Measuring the responsive design

The shared SCSS partials live in `src/styles`, which is included in Angular's Sass search paths. Components reuse named breakpoints, layout gutters, the design's text presets (`.text-preset-1` to `.text-preset-9`) and mixins for focus rings and transitions. Partials that also produce global CSS expose it through a mixin included once in `styles.scss`, so a component can `@use 'motion'` without duplicating keyframes in its own stylesheet.

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

#### Loading states

A functional HTTP interceptor adds a configurable, cancellable delay during development. It delays only actual dataset requests, leaving cached navigation immediate; production requests have no artificial delay. While loading, the index disables its filter trigger buttons and search input, and the detail renders its breadcrumb as plain text. The site navigation remains available. A shared `Skeleton` component takes width, height and radius inputs; the card skeleton reuses the real card stylesheet, so placeholders keep the final geometry.

#### Revealing content in the viewport

Page transitions use the router's View Transitions integration, and `animate.enter` / `animate.leave` handle content that is created or removed, such as the skeleton-to-content hand-off. Sections that are already in the DOM but below the fold need a different trigger, so an `appReveal` directive registers them with a single shared `IntersectionObserver`:

```ts
private readonly observer = new IntersectionObserver((entries) => this.onIntersect(entries), {
  rootMargin: '0px 0px -10% 0px',
});

private onIntersect(entries: IntersectionObserverEntry[]): void {
  for (const { target, isIntersecting, boundingClientRect, rootBounds } of entries) {
    const passed = boundingClientRect.bottom <= (rootBounds?.top ?? 0);
    if (!isIntersecting && !passed) continue;

    this.callbacks.get(target)?.(isIntersecting);
    this.unobserve(target);
  }
}
```

The directive starts in a `pending` state from the first render, so content in view never flashes visible and then hidden. Elements that were already scrolled past, as after browser Back, appear without motion. Recipe cards in the same desktop row are staggered with a CSS custom property read by `animation-delay`.

I also considered `@defer (on viewport)`, which would make `animate.enter` play when a block is created. I did not use it here: deferred content is not in the DOM until it is reached, so Tab would skip the links inside it, find-in-page could not match its text, and the placeholders would need the exact height at every breakpoint to avoid layout shifts and wrong scroll restoration. `@defer` is designed to delay loading costs, which this small static site does not have. With the directive, the content stays in the DOM: keyboard focus shows it at once, and reduced motion or a missing `IntersectionObserver` leaves everything visible.

### Useful resources

- [Reactive data fetching with httpResource](https://angular.dev/guide/http/http-resource) - Resource state, guarded value reads and reactive HTTP requests.
- [Common routing tasks](https://angular.dev/guide/routing/common-router-tasks) - Binding route and query parameters to component inputs.
- [Angular Material menus](https://material.angular.dev/components/menu/overview) - Menu items, keyboard behaviour and focus management.
- [Route transition animations](https://angular.dev/guide/routing/route-transition-animations) - The router's View Transitions integration.
- [Enter and Leave animations](https://angular.dev/guide/animations) - Native CSS animations with `animate.enter` / `animate.leave`.
- [Deferrable views](https://angular.dev/guide/templates/defer) - The `on viewport` trigger I compared with the reveal directive.
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) - Root margins and entry geometry for the viewport reveal.
- [Angular deployment](https://angular.dev/tools/cli/deployment#routed-apps-must-fall-back-to-indexhtml) - Serving routed applications with an `index.html` fallback.

### AI Collaboration

I used Claude Code and Codex as pair programmers for the Angular upgrade, implementation, reviews and visual polish, while keeping the decisions and the testing on my side.

- **Planning first**: before each larger change (the Angular 22 upgrade, each responsive page, the filters, the final review) I asked for a plan with the problem, the alternatives and the files involved. I reviewed it before any code was written, and every change went on its own `feature/*` branch with small commits that I tested locally before merging.
- **Reviews**: I used it to audit keyboard navigation, focus states, loading states, `prefers-reduced-motion` and forced colors, and to hunt for duplicated styles, templates and helpers. Refactors were checked with scripted browser runs, kept outside the repository, that compare text styles and element geometry before and after at several viewports.
- **Context in local files**: a short project file with stack, design measurements, decisions and current status; an `AGENTS.md` with the working rules shared by any coding agent.

## Author

- Frontend Mentor - [@FerdinandoGeografo](https://www.frontendmentor.io/profile/FerdinandoGeografo)
- LinkedIn - [@FerdinandoGeografo](https://www.linkedin.com/in/ferdinandogeografo/)
- GitHub - [@FerdinandoGeografo](https://github.com/FerdinandoGeografo/)
