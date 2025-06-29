import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notification: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    // Check if running in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const isLoggedIn = !!sessionStorage.getItem('loginData');

      if (isLoggedIn) {
        return true;
      } else {
        this.notification.showError("You can't access this page without logging in...");
        this.router.navigate(['/']);
        return false;
      }
    }

    // If SSR (not in browser), deny access
    return false;
  }
}
