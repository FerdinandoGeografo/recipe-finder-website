import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { routes } from './app.routes';
import { PageFocus } from './shared/data-access/page-focus';
import { skipQueryOnlyTransitions } from './shared/utils/view-transitions';

export const appConfig: ApplicationConfig = {
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
    provideAppInitializer(() => {
      inject(MatIconRegistry).addSvgIconSetInNamespace(
        'custom',
        inject(DomSanitizer).bypassSecurityTrustResourceUrl('icons/icons.svg'),
      );
    }),
    provideAppInitializer(() => {
      inject(PageFocus);
    }),
  ],
};
