import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth-store';

export const guestGuard: CanActivateFn = (route, state) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  const token = authStore.token();

  if(token){
    return router.createUrlTree(["/anasayfa"])
  }
  return true;
};
