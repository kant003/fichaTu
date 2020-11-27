import { Sing2 } from './../models/sing2';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Enrollment } from '../models/enrollments';
import { Sing } from '../models/sing';
import { InfoSchedule } from '../models/infoSchedules';
import * as moment from 'moment';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Schedule } from '../models/schedule';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SingService {

  constructor(private afs: AngularFirestore) {

  }

  sing(enrollmentId: string, sing: Sing): Promise<DocumentReference> {
    return this.afs.collection<Enrollment>('enrollments').doc(enrollmentId).collection('sings').add(sing);
  }

  sing2(sing2: Sing2): Promise<DocumentReference> {
    return this.afs.collection<Sing>('sings').add(sing2);
  }

  //
  getSingsByIdEnrollment(idEnrollment: string): Observable<Sing[]> {
    return this.afs.collection<Sing>('enrollments').doc(idEnrollment).collection('sings', ref => ref.orderBy('createdAt'))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Sing;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  getSing2(idUser: string, date: moment.Moment): Observable<Sing2[]> {
    const queryReference = this.afs.collection('users').doc(idUser).ref;

    const start = date.toDate();
    start.setHours(0);
    start.setMinutes(0);
    const finish = date.toDate();
    finish.setHours(23);
    finish.setMinutes(59);
    const startDate = firebase.default.firestore.Timestamp.fromDate(start);
    const finishDate = firebase.default.firestore.Timestamp.fromDate(finish);

    const sing2$ = this.afs.collection<Sing2>('sings',
      ref => ref.where('refUser', '==', queryReference).where('createdAt', '>', startDate).where('createdAt', '<', finishDate).orderBy('createdAt')
    ).valueChanges();
    return sing2$;
  }

  getSingInfo(idUser: string, date: moment.Moment): Observable<InfoSchedule[]> {
    const queryReference = this.afs.collection('users').doc(idUser).ref;

    const enrrollments$ = this.afs.collection<Enrollment>('enrollments', ref => ref.where('refUser', '==', queryReference)).valueChanges();

    return enrrollments$.pipe(
      map(enrollments => {
        const su: Subject = { name: 'angel' };
        const sc: Schedule = { dayOfWeek: 1, startTime: this.toTimestamp(1, 0), finishTime: this.toTimestamp(2, 0) };

        const info1: InfoSchedule = { subject: su, schedule: sc };
        const info2: InfoSchedule = { subject: su, schedule: sc };
        const a = [];
        a.push(info1);
        a.push(info2);
        return a;

      })
    );

  }

  toTimestamp(hours: number, minutes: number): firebase.default.firestore.Timestamp {
    const startDate = new Date(
      1970, // Year
      1, // Month
      1, // Date
      hours,
      minutes,
    );
    return firebase.default.firestore.Timestamp.fromDate(startDate);
  }



  getEnrollmentPopulatedById(enrollmentId: string): Observable<Enrollment> {
    const bb$ = this.afs.collection<Enrollment[]>('enrollments').doc<Enrollment>(enrollmentId).valueChanges() as Observable<Enrollment>;
    // const user$ = this.afs.collection<User[]>('users').doc<User>(enrollment.refUser.id).valueChanges()
    return bb$.pipe(

      switchMap((enroll: Enrollment) => {
        const user$ = this.afs.collection<User[]>('users').doc<User>(enroll.refUser.id).valueChanges() as Observable<User>;

        return user$.pipe(
          map((u: User) => {
            enroll.realUser = u;
            return enroll;
          })
        ) as Observable<Enrollment>;
      }),

      switchMap(enroll => {
        const subject$ = this.afs.collection<Subject[]>('subjects')
          .doc<Subject>(enroll.refSubject.id).valueChanges() as Observable<Subject>;

        return subject$.pipe(
          map((u: Subject) => {
            enroll.realSubject = u;
            return enroll;
          })
        ) as Observable<Enrollment>;
      })

    );
  }


}
