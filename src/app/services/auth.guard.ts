import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
                private router: Router ) {}

  canLoad(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          }),
          take(1)
        );
  }

  canActivate(): Observable<boolean>{
    return this.authService.isAuth()
        .pipe(
          tap( estado => {
            if ( !estado ) { this.router.navigate(['/login'])}
          })
        );
  }

}

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   console.log('authService.isAuth()', authService.isAuth())
//   // if (authService.isAuth()) {
//   //   return true;
//   // }
//   // router.navigate(['/login']);
//   // return false;
//   return authService.isAuth()
//   .pipe(
//     tap( estado => {
//       console.log('estado', estado)
//       if ( !estado ) { router.navigate(['/login'])}
//     })
//   );
// };
