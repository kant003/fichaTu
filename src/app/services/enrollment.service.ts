import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Enrollment } from '../models/enrollments';
import { User } from '../models/user';
import { Subject } from '../models/subject';
import { Schedule } from '../models/schedule';

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
  updateEnrollment(idEnrollment: string, data: Partial<unknown>): Promise<void> {
    return this.afs.collection('enrollments').doc(idEnrollment).update(data);
  }


}
