import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
  provideToastr({
    timeOut: 3000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  }), provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "top" })),
  provideClientHydration(),
  provideHttpClient(withFetch()),
  

]
};
