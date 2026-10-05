import { bootstrapApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { skipQueryOnlyTransitions } from './app/shared/view-transitions';

// Zoneless change detection and HttpClient (fetch) are Angular defaults since v21.
bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: skipQueryOnlyTransitions,
      }),
    ),
  ],
}).catch((err) => console.error(err));
