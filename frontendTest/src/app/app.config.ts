import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './Services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    
      provideHttpClient(withInterceptors([authInterceptor])),
    provideHttpClient(),provideAnimationsAsync(),
        providePrimeNG({ 
            theme: {
                preset: Aura
            }
        }),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
