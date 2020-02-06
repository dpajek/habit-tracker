import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'; 
import { User } from './user'

@Injectable()
export class AuthService {
  user$: Observable<User>;


  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {  
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
    }

   ngOnInit() {
   
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
        this.updateUserData(credential.user);
      })
   }
   
  signOut() {
     this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
     }) 
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