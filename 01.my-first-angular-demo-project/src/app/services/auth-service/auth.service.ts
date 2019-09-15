import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserModel from 'src/app/models/user.model';
import { UserService } from '../user-service/user.service';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<UserModel> {
    return this.user$.pipe(switchMap(user => { //user: firebase.User
      if (user) {
        return this.userService.get(user.uid).valueChanges();
      }
      return of(null);
    }));
  }
}
