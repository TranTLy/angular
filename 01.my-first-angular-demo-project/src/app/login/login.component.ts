import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService, private route: ActivatedRoute) { }
  login() {
    this.authService.login();
  }
}
