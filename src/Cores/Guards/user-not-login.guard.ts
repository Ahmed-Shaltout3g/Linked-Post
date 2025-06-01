
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userNotLoginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if the code is running in the browser
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('userToken')) {
      router.navigate(['/posts']); // User is logged in, redirect to posts
      return false; // Block access
    } else {
      return true; // User is not logged in, allow access
    }
  }

  // If not running in the browser, deny access by default
  return false;
};
