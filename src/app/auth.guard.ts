import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';

//import { tap, map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(
  public auth: AuthService, 
  public router: Router
) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    console.log('canActivate1');
    if(this.auth.isLoggedIn !== true) {
      console.log('Access Denied -- Login required');
      this.router.navigate(['/login']);;
      //this.router.navigate(['sign-in']);;
      return false;
    }
    return true;
      /*
      return this.auth.user$
        .pipe(map(user => {
          console.log('2');
          console.log(user);
          return !!user;
        }));
*/
        

      //console.log(this.auth.user$)
      /*
    return this.auth.user$.pipe(
      //take(1),
      map(user => {
        console.log('canActivate-map')
        return !!user;
      }), // map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['habits']);
        }
      })
    );
    */
  }
}
