import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { map } from 'rxjs/operators'

import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  private mailApi = 'https://mailthis.to/habittracker';

constructor (public auth: AuthService,
    public router: Router,
    private http: HttpClient) {}

  //name = 'Daniel\'s';
  name = '';


ngOnInit() {
    if(this.auth.isLoggedIn === true) {
      console.log('Logged in, redirect to habits page')
      this.router.navigate(['/habits']);
    }
  }

sendMail(name: String, email: String, subject: String, message: String): void {
    name = name.trim();
    email = email.trim();
    subject = subject.trim();
    message = message.trim();

    let formContents = {
      name: name, 
      _replyto: email, 
      _subject: subject, 
      message: message,
     };

    console.log(formContents);

    this.http.post(this.mailApi, formContents, { responseType: 'text' })
      .pipe(
        map(
          (response) => {
            if (response) {
              return response;
            }
          },
          (error: any) => {
            return error;
          }
        )
      ).subscribe(response => {
        location.href = 'https://mailthis.to/confirm';
        console.log(response);
        }, error => {
        console.warn(error.responseText);
        console.log({ error });
        });

  }

}