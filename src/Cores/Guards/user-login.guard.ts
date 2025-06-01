import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userLoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if the code is running in the browser
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('userToken')) {
      return true; // User is logged in, allow access
    } else {
      router.navigate(['/home']); // Navigate to home if not logged in
      return false;
    }
  }

  // If not running in the browser, deny access by default
  return false;
};
