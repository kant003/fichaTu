import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';        // for authentication
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';


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
  user$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    //afAuth.user
    //afAuth.currentUser
    // afAuth.authState.subscribe(user => this.user = user);
    /*this.afAuth.auth..subscribe((auth) => {
      this.authState = auth;
    });*/
   // afAuth.use
    //afAuth.authState.subscribe( user => this.user = user as firebase.User);
    this.user$ = afAuth.user;
  }


  googleLogin(): Promise<firebase.auth.UserCredential> {
      const provider = new firebase.auth.GoogleAuthProvider();
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

  get currentUserObservable(): Promise<firebase.User> {
    return this.afAuth.currentUser as Promise<firebase.User>;
  }
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

}
