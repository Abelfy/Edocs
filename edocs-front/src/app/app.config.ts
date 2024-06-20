import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { reducers, metaReducers } from './reducers';
import { SoftwareEffects } from './reducers/softwares/softwares.effects';
import { provideHttpClient } from '@angular/common/http';
import { VersionEffects } from './reducers/versions/versions.effects';
import { FunctionnalityEffects } from './reducers/functionnalities/functionnalities.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(reducers, { metaReducers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode()}),
    provideEffects([SoftwareEffects, VersionEffects, FunctionnalityEffects]),
    provideRouterStore()]
};
