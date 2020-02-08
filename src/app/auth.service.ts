import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'; 
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  userData: User;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {  
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        console.log('userData.uid:' + this.userData.uid)
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });

    /*
           this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            console.log('yes user')
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            console.log('no user')
            return of(null);
          }
        })
      );
      */
    }

   ngOnInit() {

   }

   get isLoggedIn(): boolean {
     const user = JSON.parse(localStorage.getItem('user'));
     return (user !== null) ? true : false;
   }

  googleSignin()  {
     const provider = new auth.GoogleAuthProvider();
     return this.oAuthLogin(provider);
     /*
     const credential = await this.afAuth.auth.signInWithPopup(provider);
     return this.updateUserData(credential.user);
     */
   }

   //new way
   private oAuthLogin(provider) {
     return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.ngZone.run(() => {

        })
        //this.updateUserData(credential.user);
      })
   }
   
  signOut() {
     return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.userData = null;
      this.router.navigate(['/']);
     });
   }

   private updateUserData(user) {
     // Sets user data to firestore on login
     const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

     const data = {
       uid: user.uid,
       email: user.email,
       displayName: user.displayName //,
       //photoURL: user.URL
     };

     return userRef.set(data, {merge: true });
     
   }
}