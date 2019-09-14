import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import { ActivatedRoute } from '@angular/router';

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
