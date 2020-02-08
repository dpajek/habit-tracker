import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public router: Router
    ) { }

  ngOnInit() {
    if(this.auth.isLoggedIn === true) {
      console.log('Logged in, redirect to habits page')
      this.router.navigate(['/habits']);
    }
  }

}