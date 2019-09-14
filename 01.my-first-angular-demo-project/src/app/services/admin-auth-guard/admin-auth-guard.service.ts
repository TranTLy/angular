import { UserService } from '../user-service/user.service';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.user$
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map(user => user.isAdmin));
  }
}
