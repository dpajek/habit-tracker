import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

constructor (public auth: AuthService,
    public router: Router) {}

  //name = 'Daniel\'s';
  name = '';


ngOnInit() {
    if(this.auth.isLoggedIn === true) {
      console.log('Logged in, redirect to habits page')
      this.router.navigate(['/habits']);
    }
  }

}