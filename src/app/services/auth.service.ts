import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';        // for authentication

@Injectable({
  providedIn: 'root'
})
export class AuthService {


 /* private _user!: firebase.User;

  get user(): firebase.User {
    return this._user;
  }

  set user(value: firebase.User) {
    this._user = value;
  }*/

  // user?: firebase.User;
  user$: Observable<firebase.default.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    // afAuth.user
    // afAuth.currentUser
    // afAuth.authState.subscribe(user => this.user = user);
    /*this.afAuth.auth..subscribe((auth) => {
      this.authState = auth;
    });*/
   // afAuth.use
    // afAuth.authState.subscribe( user => this.user = user as firebase.User);
    this.user$ = afAuth.user;
  }


  googleLogin(): Promise<firebase.default.auth.UserCredential> {
      const provider = new firebase.default.auth.GoogleAuthProvider();
      return this.afAuth.signInWithPopup(provider);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Returns true if user is logged in
  /*get authenticated(): boolean {
    // return this.authState !== null;
    // return this.afAuth.authState.;
    return this._user !== null;

  }*/

  // Returns current user
 /* get currentUser(): firebase.User {
    // return this.authenticated ? this.authState.auth : null;
    return this.user;
  }*/

  // Returns current user UID
  /*get currentUserId(): string {
    return this.user.uid;
  }*/

  get currentUserObservable(): Promise<firebase.default.User> {
    return this.afAuth.currentUser as Promise<firebase.default.User>;
  }
  /*get timestamp() {
    return firebase.default.firestore.FieldValue.serverTimestamp();
  }*/

  get timestamp(): firebase.default.firestore.Timestamp {
    return firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp;
  }

}
