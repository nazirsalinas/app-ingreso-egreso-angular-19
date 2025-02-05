import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('authService.isAuth()', authService.isAuth())
  // if (authService.isAuth()) {
  //   return true;
  // }
  // router.navigate(['/login']);
  // return false;
  return authService.isAuth()
  .pipe(
    tap( estado => {
      console.log('estado', estado)
      if ( !estado ) { router.navigate(['/login'])}
    })
  );
};
