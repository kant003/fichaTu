import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router,
    private ngZone: NgZone) {

  }

  ngOnInit(): void {

    this.authService.user$.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/user', user.uid]);
        });

      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  googleLogin(): void {
    this.authService.googleLogin()
      .then(credential => {
        if (credential.user == null) {
          this.snackBarService.error('Fallo al realizar el login', 'Cerrar');
        }
        this.userService.updateUserData(credential.user as firebase.default.User);
        this.router.navigate(['/user', credential.user?.uid]);

      }).catch(response => {
        console.log(response.message);
        this.snackBarService.error('Fallo al realizar el login.' + response.message, 'Cerrar');

      });
  }



}
