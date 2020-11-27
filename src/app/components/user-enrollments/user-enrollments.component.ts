import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollments';
import { Sing } from 'src/app/models/sing';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { IpService } from 'src/app/services/ip.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import * as firebase from 'firebase/app';
import { SingService } from '../../services/sing.service';
import { MatButton } from '@angular/material/button';
import * as moment from 'moment';
import { Sing2 } from 'src/app/models/sing2';
import { AngularFirestore } from '@angular/fire/firestore';
import { SubjectService } from 'src/app/services/subject.service';
import { Schedule } from 'src/app/models/schedule';
import { Subject } from 'src/app/models/subject';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-enrollments',
  templateUrl: './user-enrollments.component.html',
  styleUrls: ['./user-enrollments.component.scss']
})
export class UserEnrollmentsComponent implements OnInit {
  @Input() idUser!: string;
  enrollements$!: Observable<Enrollment[]>;

  constructor(
    public enrollmentService: EnrollmentService,
    private singService: SingService,
    private subjectService: SubjectService,
    private snackBarService: SnackBarService,
    private ipService: IpService,
    private afs: AngularFirestore) {
    }

  ngOnInit(): void {
    this.enrollements$ = this.enrollmentService.getEnrollmentsByUserIdWithTimer(this.idUser);
  }


  sing(button: MatButton, enrollmentId: string | undefined): void {
    if (enrollmentId === undefined) { return; }
    const sing: Sing = {
      createdAt: firebase.default.firestore.
        FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp, // TODO: Facilmente hackeable
      ip: this.ipService.ip
    };
    console.log('fichando...');

    this.singService.sing(enrollmentId, sing).then(
      () => {
        button.disabled = true;
        this.snackBarService.info('Fichaje realizado con éxito', 'Cerrar');
      },
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );


  }


  sing2(button: MatButton, enrollmentId: string | undefined, subjectId: string | undefined): void {
    const refEnrollment = this.afs.collection('enrollments').doc(enrollmentId).ref;
    const refUser = this.afs.collection('users').doc(this.idUser).ref;
    console.log(subjectId);
    const refSubject = this.afs.collection('subjects').doc(subjectId).ref;


    this.afs.collection('subjects').doc<Subject>(subjectId).collection<Schedule>('schedules').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(schedules => {
      // schedules.filter()
      // console.log(schedules);
      const createdAt = firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp;
      const refSchedule = this.afs.collection('subjects').doc(subjectId).collection('schedules').doc(schedules[0].id).ref;

      const r = schedules.filter(schedule => {
        const now = moment('1970-1-1');
        now.hours(moment().hours());
        now.minutes(moment().minutes());

        console.log('A', now);
        const startTime = moment(schedule.startTime.toDate());
        console.log('B', startTime);
        const finishTime = moment(schedule.finishTime.toDate());
        console.log('C', finishTime);
        console.log('F', now.isBetween(startTime, finishTime));

        return now.isBetween(startTime, finishTime);
      });

      let dayOfWeek = null;
      let startTime = null;
      let finishTime = null;
      if (r.length > 0) {
        dayOfWeek = r[0].dayOfWeek;
        startTime = r[0].startTime;
        finishTime = r[0].finishTime;
      }
      const sing2: Sing2 = {
        createdAt: firebase.default.firestore.
          FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp, // TODO: Facilmente hackeable
        ip: this.ipService.ip,
        refUser,
        refSubject,
        refEnrollment,
        refSchedule,
        dayOfWeek, // Sunday as 0 and Saturday as 6. As momentjs
        startTime,
        finishTime
      };
      this.singService.sing2(sing2);
    });

  }

  canSing(n: number | null): boolean {
    if (n === null) { return false; }
    else { return n > 0; }
  }


  getColor(n: number | null): string {
    if (n === null) {
      return '';
    }
    return n < 10 ? 'red' : '';
  }

}
