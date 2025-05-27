import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { productReducer } from './store/product/product.reducer';
import { ProductEffects } from './store/product/product.effects';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),
    provideAnimations(),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideStore({ products: productReducer }),
  provideEffects([ProductEffects]),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'fill' }
  }
  ]
};
