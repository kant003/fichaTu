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

@Injectable({
  providedIn: 'root'
})
export class SingService {

  constructor(private afs: AngularFirestore) {

  }

  sing(enrollmentId: string, sing: Sing): Promise<DocumentReference> {
    return this.afs.collection<Enrollment>('enrollments').doc(enrollmentId).collection('sings').add(sing);
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

  getSingInfo(idUser: string, date: moment.Moment): Observable<InfoSchedule[]> {
    const queryReference = this.afs.collection('users').doc(idUser).ref;

    const bb$ = this.afs.collection<Enrollment>('enrollments', ref => ref.where('refUser', '==', queryReference))
      .valueChanges();

    return bb$.pipe(
      map(enrollments => {

        const su: Subject = { name: 'angel' };
        const sc: Schedule = { dayOfWeek: 1, start: '1:00', finish: '2:00' };

        const info1: InfoSchedule = { subject: su, schedule: sc };
        const info2: InfoSchedule = { subject: su, schedule: sc };
        const a = [];
        a.push(info1);
        a.push(info2);
        return a;

      })
    );

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
