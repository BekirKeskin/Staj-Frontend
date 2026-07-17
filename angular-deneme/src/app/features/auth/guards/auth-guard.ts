import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth-store';

export const authGuard: CanActivateFn = (route, state) => { //canactivatefn= bu fonksiyon bir route açılmadan önce çalışacak
  
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const token = authStore.token();

  if(!token){
    return router.createUrlTree(["/login"]);
  }
  return true;
};
