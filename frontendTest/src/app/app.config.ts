import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideAnimationsAsync(),
        providePrimeNG({ 
            theme: {
                preset: Aura
            }
        }),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
