import { bootstrapApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { skipQueryOnlyTransitions } from './app/shared/utils/view-transitions';
import { requestDelayInterceptor } from './app/shared/utils/request-delay';

// Zoneless and fetch are defaults; HttpClient is configured here for the delay interceptor.
bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([requestDelayInterceptor])),
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
