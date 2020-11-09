import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalizedString } from '@angular/compiler';
import { EnrollmentService } from '../../services/enrollment.service';
import * as firebase from 'firebase';
import { Sing } from 'src/app/models/sing';
import { SingService } from '../../services/sing.service';

@Component({
  selector: 'app-security-test',
  templateUrl: './security-test.component.html',
  styleUrls: ['./security-test.component.css']
})
export class SecurityTestComponent implements OnInit {

  loguedUserId!: string;
  otherUserId = 't2BryeIakcfdBA5USjIw119IDp83';
  canReadOwnUser: string | undefined;
  canReadOtherUser: string | undefined;
  canReadOwnEnrollment: string | undefined;
  canReadOtherEnrollment: string | undefined;
  canSingOnOwnEnrollment: string | undefined;
  canSingOnOtherEnrollment: string | undefined;
  canEditOwnUser: string | undefined;
  canEditOtherUser: string | undefined;
  canEditOwnUserIsTeacher: string | undefined;
  canEditOtherUserIsTeacher: string | undefined;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private enrollmentService: EnrollmentService,
    private singService: SingService) {
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user === null) { this.loguedUserId = 'sin loguear'; }
      else { this.loguedUserId = user.uid; }
    });
  }

  testAsTeacherLogin(): void {
    this.userService.getUserById(this.loguedUserId).subscribe(
      user => this.canReadOwnUser = 'pass',
      error => this.canReadOwnUser = 'no pass: ' + error
    );
    this.userService.getUserById(this.otherUserId).subscribe(
      user => this.canReadOtherUser = 'pass',
      error => this.canReadOtherUser = 'no pass: ' + error
    );
  }

  testAsUserLogin(): void {
    // leemos nuestros propios datos de usuario
    this.userService.getUserById(this.loguedUserId).subscribe(
      user => this.canReadOwnUser = 'pass',
      error => this.canReadOwnUser = 'no pass: ' + error
    );
    //leemos datos de un usuario que no soy yo
    this.userService.getUserById(this.otherUserId).subscribe(
      user => this.canReadOtherUser = 'no pass',
      error => this.canReadOtherUser = 'pass: '
    );
    //leemos matriculas que me pertenecen
    this.enrollmentService.getEnrollmentsByUserId(this.loguedUserId).subscribe(
      user => this.canReadOwnEnrollment = 'pass',
      error => this.canReadOwnEnrollment = 'no pass: ' + error
    );
    //leemos matriculas que no me pertenecen
    this.enrollmentService.getEnrollmentsByUserId(this.otherUserId).subscribe(
      user => this.canReadOtherEnrollment = 'no pass',
      error => this.canReadOtherEnrollment = 'pass: '
    );

    // firmamos en una matriculas que nos pertenece YukS57ddJrNN2SvQG7ei
    const sing: Sing = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp, // TODO: Facilmente hackeable
      ip: '11.22.33.44'
    };
    this.singService.sing('YukS57ddJrNN2SvQG7ei', sing).then(
      () => this.canSingOnOwnEnrollment = 'pass',
      error => this.canSingOnOwnEnrollment = 'no pass: ' + error
    );

    // firmamos en una matriculas que no nos pertenece PrB7pK8UbUii6hIEaAPD
    const sing2: Sing = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp, // TODO: Facilmente hackeable
      ip: '11.22.33.44'
    };
    this.singService.sing('PrB7pK8UbUii6hIEaAPD', sing2).then(
      () => this.canSingOnOtherEnrollment = 'no pass',
      error => this.canSingOnOtherEnrollment = 'pass: '
    );

    //editamos nuestros propios datos (active)
    this.userService.updateUserActive(this.loguedUserId, true).then(
      () => this.canEditOwnUser = 'pass',
      error => this.canEditOwnUser = 'no pass: ' + error
    );
    //editamos los datos de otros usaurios
    this.userService.updateUserActive(this.otherUserId, true).then(
      () => this.canEditOtherUser = 'no pass:',
      error => this.canEditOtherUser = 'pass:'
    );

    //editamos nuestros el campo isTeacher de  sus propios datos (active)
    this.userService.updateUserIsTeacher(this.loguedUserId, true).then(
      () => this.canEditOwnUserIsTeacher = 'no pass',
      error => this.canEditOwnUserIsTeacher = 'pass: '
    );
    //editamos el campo isTeacher de los datos de otros usaurios
    this.userService.updateUserIsTeacher(this.otherUserId, true).then(
      () => this.canEditOtherUserIsTeacher = 'no pass:',
      error => this.canEditOtherUserIsTeacher = 'pass:'
    );
  }

}
//http://localhost:4200/user/
// vvwoFB6w3CfqEjlBWsVMVa7B2uT2/
//enrollment/YukS57ddJrNN2SvQG7ei/sings
