import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';        // for authentication


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User | null = null;
  title = 'Angel';
  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.userService.getUserById(firebaseUser.uid).subscribe(user => this.user = user)
        //this.user = user;
      } else {
        this.user = null;
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
      }
    });
  }
}
