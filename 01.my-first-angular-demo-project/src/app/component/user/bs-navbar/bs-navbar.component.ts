import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import UserModel from 'src/app/models/user.model';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  appUser: UserModel;

  constructor(private authService: AuthService, private router: Router) {
    // console.log("on constructor bs navbar");
    authService.appUser$.subscribe(user => this.appUser = user);
    console.log("appuser: " + JSON.stringify(this.appUser));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
