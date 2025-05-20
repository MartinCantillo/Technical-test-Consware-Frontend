import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceServiceService } from './auth-service-service.service';


export const authGuard: CanActivateFn = () => {

  
  const authService = inject(AuthServiceServiceService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {  
    return true;
  }

  router.navigate(['/loggin']);
  return false;
};
