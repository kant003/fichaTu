import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Enrollment } from '../models/enrollments';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Schedule } from '../models/schedule';
import * as moment from 'moment';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private afs: AngularFirestore) { }



  //
  getEnrollmentsByUserId(userId: string): Observable<Enrollment[]> {
    const queryReference = this.afs.collection('users').doc(userId).ref;

    return this.afs.collection<Enrollment>('enrollments', ref => ref.where('refUser', '==', queryReference))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Enrollment;
            const id = a.payload.doc.id;
            const user = this.afs.doc(data.refUser.path).valueChanges() as Observable<User>;
            const subject = this.afs.doc(data.refSubject.path).valueChanges() as Observable<Subject>;

            return { id, ...data, user, subject };
          });
        })
      );
  }

  getEnrollmentsByUserIdWithTimer(userId: string): Observable<Enrollment[]> {
    const queryReference = this.afs.collection('users').doc(userId).ref;

    return this.afs.collection<Enrollment>('enrollments', ref => ref.where('refUser', '==', queryReference))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Enrollment;
            const id = a.payload.doc.id;
            const user = this.afs.doc(data.refUser.path).valueChanges() as Observable<User>;
            let subject = this.afs.doc(data.refSubject.path).valueChanges() as Observable<Subject>;

            subject = subject.pipe(
              map(s => {
                s.act$ = timer(0, 1000).pipe<number>(
                  map((t: number) => {
                    if (s.deadLine === undefined) return 0;
                    const deadLine = this.fromModel(s.deadLine);
                    if (deadLine === null) return 0;
                    const now = moment();
                    return deadLine.diff(now, 'seconds') as number;
                  })
                );
                return s;
              })
            );


            return { id, ...data, user, subject };
          });
        })
      );
  }

  fromModel(ts: firebase.default.firestore.Timestamp | undefined): moment.Moment | null {
    if (ts instanceof firebase.default.firestore.Timestamp) {
      return moment(ts.toDate());
    } else {
      return null;
    }
  }
  //
  getEnrollmentsBySubjectIdOrderedByPos(idSubject: string): Observable<Enrollment[]> {
    const queryReferenceSubject = this.afs.collection('subjects').doc(idSubject).ref;

    return this.afs.collection<Enrollment>('enrollments', ref => ref.orderBy('pos').where('refSubject', '==', queryReferenceSubject))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Enrollment;
            const id = a.payload.doc.id;
            const user = this.afs.doc(data.refUser.path).valueChanges() as Observable<User>;
            const subject = this.afs.doc(data.refSubject.path).valueChanges() as Observable<Subject>;

            return { id, ...data, user, subject };
          });
        })
      );
  }

  /*getEnrollmentPopulatedById(enrollmentId: string): Observable<Enrollment> {
    const bb$ = this.afs.collection<Enrollment[]>('enrollments').doc<Enrollment>(enrollmentId).valueChanges()
    //const user$ = this.afs.collection<User[]>('users').doc<User>(enrollment.refUser.id).valueChanges()
    return bb$.pipe(

      switchMap(enroll => {
        const user$ = this.afs.collection<User[]>('users').doc<User>(enroll.refUser.id).valueChanges();
        return user$.pipe(
          map(u => {
            enroll.realUser = u;
            return enroll;
          })
        );
      }),

      switchMap(enroll => {
        const subject$ = this.afs.collection<Subject[]>('subjects').doc<Subject>(enroll.refSubject.id).valueChanges();
        return subject$.pipe(
          map(u => {
            enroll.realSubject = u;
            return enroll;
          })
        );
      })
    );
  }*/
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



  /*getSubjectByidEnrollment(enrollmentId: string): Observable<Subject> {
    const bb$ = this.afs.collection<Enrollment[]>('enrollments').doc<Enrollment>(enrollmentId).valueChanges() as Observable<Enrollment>;
    return bb$.pipe(
      switchMap(enrollment => {
        return this.afs.collection<Subject[]>('subjects')
          .doc<Subject>(enrollment.refSubject.id).valueChanges() as Observable<Subject>;
      })
    );
  }*/


  getEnrollmentsByIdUserSubjectId(idUser: string, idSubject: string): Observable<Enrollment[]>{
    const queryReferenceUser = this.afs.collection('users').doc(idUser).ref;
    const queryReferenceSubject = this.afs.collection('subjects').doc(idSubject).ref;

    return this.afs.collection<Enrollment>('enrollments',
    ref => ref
    .where('refUser', '==', queryReferenceUser)
    .where('refSubject', '==', queryReferenceSubject)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Enrollment;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getSchedulersByidEnrollment(enrollmentId: string): Observable<Schedule[]> {
    const bb$ = this.afs.collection<Enrollment[]>('enrollments').doc<Enrollment>(enrollmentId).valueChanges() as Observable<Enrollment>;
    return bb$.pipe(
      switchMap(enrollment => {
        return this.afs.collection<Subject[]>('subjects').doc<Subject>(enrollment.refSubject.id)
          .collection<Schedule>('schedules').valueChanges() as Observable<Schedule[]>;
      })
    );
  }

  //
  addEnrollment(enrollment: Enrollment): Promise<DocumentReference> {
    return this.afs.collection<Enrollment>('enrollments').add(enrollment);
  }


  //
  deleteEnrollment(idEnrollment: string): Promise<void> {
    return this.afs.collection<Enrollment>('enrollments').doc(idEnrollment).delete();
  }
  //
  updateEnrollment(idEnrollment: string, data: Partial<Enrollment>): Promise<void> {
    return this.afs.collection<Enrollment>('enrollments').doc<Enrollment>(idEnrollment).update(data);
  }


}
