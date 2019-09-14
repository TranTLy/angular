import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route, state: RouterStateSnapshot) {
    // console.log("on can active")
    return this.authService.user$.pipe(map(user => {
      if (user) {
        return true;
      }

      // console.log("state url: " + state.url);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }));
  }
}
