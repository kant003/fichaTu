import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, QueryFn } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'src/app/models/subject';
import { Enrollment } from '../models/enrollments';
import { Schedule } from '../models/schedule';
import { Paginated, Operation } from './paginated-service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends Paginated<Subject> {

  fielFilter = 'name';

  nameFilter$: BehaviorSubject<string>;

  constructor(private afs: AngularFirestore) {
    super(10);
    this.nameFilter$ = new BehaviorSubject('');
  }

  /*getSubjects(): Observable<Subject[]> {

    return this.afs.collection<Subject>('subjects').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Subject;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }*/

  getSubjectsPaginated(): Observable<Subject[]> {
    return this.paginateFilter$.pipe(
      switchMap(query => {
        let reff: QueryFn;
        switch (query.operation) {
          case Operation.nextPage:
            reff = (ref) => ref.orderBy(this.fielFilter).startAfter(query.data).limit(3);
            break;
          case Operation.prevPage:
            reff = (ref) => ref.orderBy(this.fielFilter).endBefore(query.data).limitToLast(3);
            break;
          case Operation.simple:
            reff = (ref) => ref.orderBy(this.fielFilter).limit(3);
            break;
        }

        return this.afs.collection<Subject>('subjects', reff).valueChanges();
      })
    );
  }

  //
  getSubjectsPaginatedFilterName(): Observable<Subject[]> {
    return combineLatest([this.nameFilter$, this.paginateFilter$, this.pageSize$]).pipe(

      switchMap(([name, query, pageSize]) => {

        let reff: QueryFn;
        switch (query.operation) {
          case Operation.nextPage:
            reff = ref => ref.orderBy(this.fielFilter).startAt(name).endAt(name + '\uf8ff').startAfter(query.data).limit(pageSize);
            break;
          case Operation.prevPage:
            reff = ref => ref.orderBy(this.fielFilter).startAt(name).endAt(name + '\uf8ff').endBefore(query.data).limitToLast(pageSize);
            break;
          case Operation.simple:
            reff = ref => ref.orderBy(this.fielFilter).startAt(name).endAt(name + '\uf8ff').limit(pageSize);
            break;
        }

        return this.afs.collection<Subject>('subjects', reff).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Subject;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );

      }
      )
    );
  }

  getAllSubjects(): Observable<Subject[]> {

    return this.afs.collection<Subject>('subjects')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  getSubjectRefById(idSubject: string): DocumentReference {
    return this.afs.doc('/subjects/' + idSubject).ref;
  }

  getSubjectById(idSubject: string): Observable<Subject> {
    return this.afs.collection<Subject>('subjects').doc<Subject>(idSubject).valueChanges() as Observable<Subject>;
  }

  addSubject(subject: Subject): Promise<DocumentReference> {
    return this.afs.collection<Subject>('subjects').add(subject);
  }

  // Remove this subject and all asociated enrollments (transaction)
  // TODO: Use a transaction
  async deleteSubject(subjectId: string): Promise<void> {
    // Remove all asociated enrollments
    const batch = this.afs.firestore.batch();

    const queryReference = this.afs.collection('subjects').doc(subjectId).ref;
    const qs = this.afs.collection<Enrollment>('enrollments', ref => ref.where('refSubject', '==', queryReference));
    await qs.get().forEach(e => {
      e.docs.forEach(doc => {
        console.log('m:', doc.id);
        batch.delete(doc.ref);
      });
    });

    batch.commit();

    return this.afs.collection<Subject>('subjects').doc(subjectId).delete();
  }

  async updateSubject(subjectId: string, data: Partial<unknown>): Promise<void> {

    /* const batch = this.afs.firestore.batch;

     this.afs.collection<Enrollment>('enrollments', ref => ref.where('refSubject', '==', subjectId))
       .valueChanges().forEach(e=>e.)


       .subscribe(enrollments=>{
         enrollments.forEach(enrollment =>{
           batch.delete(enrollment);

         })
       })

     for (const doc of documents) {
       await clearFirestoreData(await doc.listCollections());
       batch.delete(doc);
     }
     await batch.commit();


       */
    return this.afs.collection<Subject>('subjects').doc(subjectId).update(data);
    // TODO borrar tambien todos los enrollments asociados en una transacción

  }

  getSchedulesByIdSubject(idSubject: string): Observable<Schedule[]> {
    return this.afs.collection<Subject>('subjects').doc(idSubject).collection<Schedule>('schedules').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addSchedule(idSubject: string, schedule: Schedule): Promise<DocumentReference> {
    return this.afs.collection<Subject>('subjects').doc(idSubject).collection<Schedule>('schedules').add(schedule);
  }

  deleteSchedule(idSubject: string, idSchedule: string): Promise<void> {
    return this.afs.collection<Subject>('subjects').doc(idSubject).collection<Schedule>('schedules').doc(idSchedule).delete();
  }

  /*

    getSubjectsPagination(pageIndex: number): Observable<Subject[]> {
      return this.afs.collection<Subject>('subjects', ref => ref
        .orderBy('createdAt')
        .startAt(2)
        .limit(3)).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Subject;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
    }*/
}
