import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';
import { MockInterceptor } from '@bt-libs/shared/data-access/generic-http';
import {
  expensesFeatureKey,
  expensesReducer,
  ExpensesEffects,
} from '@bt-libs/finance/data-access/expenses';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: expensesFeatureKey, reducer: expensesReducer }),
    provideEffects(ExpensesEffects),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptors([MockInterceptor])),
  ],
};
