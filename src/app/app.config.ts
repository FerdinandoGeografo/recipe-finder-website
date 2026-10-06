import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { routes } from './app.routes';
import { requestDelayInterceptor } from './shared/utils/request-delay';
import { skipQueryOnlyTransitions } from './shared/utils/view-transitions';

// Zoneless and fetch are defaults; HttpClient is configured here for the delay interceptor.
export const appConfig: ApplicationConfig = {
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
    provideAppInitializer(() => {
      inject(MatIconRegistry).addSvgIconSetInNamespace(
        'custom',
        inject(DomSanitizer).bypassSecurityTrustResourceUrl('icons/icons.svg'),
      );
    }),
  ],
};
