import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
//import 'firebase/firestore';
import { AngularFirestore, AngularFirestoreDocument, QueryFn, DocumentReference } from '@angular/fire/firestore';

//import { firestore } from 'firebase';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { Operation, Paginated } from './paginated-service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends Paginated<User> {
  fielFilter = 'email';

  nameFilter$: BehaviorSubject<string>;
  emailFilter$: BehaviorSubject<string>;


  constructor(private afs: AngularFirestore) {
    super(10);
    this.nameFilter$ = new BehaviorSubject('');
    this.emailFilter$ = new BehaviorSubject('');
  }

  //
  getUserById(uid: string): Observable<User> {
    return this.afs.doc<User>('users/' + uid).valueChanges() as Observable<User>;
  }

  getUsers(): Observable<User[]> {
    return combineLatest([this.nameFilter$, this.emailFilter$]).pipe(
      switchMap(([name, email]) =>
        this.afs.collection<User>('users', ref => {
          let query: firebase.default.firestore.CollectionReference | firebase.default.firestore.Query = ref;

          // if (name) { query = query.orderBy('name')./*where('displayName', '==', name).*/startAt(name).endAt(name + '\uf8ff') };
          if (name) { query = query.orderBy('displayName').startAt(name).endAt(name + '\uf8ff'); }
          if (email) { query = query.orderBy('email').startAt(email).endAt(email + '\uf8ff'); }
          return query;
        }).valueChanges()
      )
    );
  }

  //
  getUsersPaginatedFilterNameAndEmail(): Observable<User[]> {
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

        return this.afs.collection<User>('users', reff).valueChanges();
      }
      )
    );
  }

  updateUserData(user: firebase.default.User): void {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    userRef.get().subscribe(snap => {
      if (snap.exists) { // si el documento existe
        const data: User = {
          uid: user.uid,
          email: user.email as string,
          displayName: user.displayName as string,
          // isAdmin: null, // si existe nunca lo pondremos a true, tendrá que enviarse null (rules firebase)
          photoURL: user.photoURL as string,
          updatedAt: this.timestamp as firebase.default.firestore.Timestamp,
          createdAt: this.timestamp as firebase.default.firestore.Timestamp
        };

        return userRef.set(data, { merge: true });

      } else { // si el documento no existe
        const data: User = {
          uid: user.uid,
          email: user.email as string,
          displayName: user.displayName as string,
          photoURL: user.photoURL as string,
          group: 1,
          isActive: true,
          isAdmin: false, // si no existe le documento es obligatorio que no sea administrador para poder crearlo (rules firebase)
          isTeacher: false, // si no existe le documento es obligatorio que no sea profesor para poder crearlo (rules firebase)
          updatedAt: this.timestamp as firebase.default.firestore.Timestamp,
          createdAt: this.timestamp as firebase.default.firestore.Timestamp
        };

        return userRef.set(data, { merge: true });
      }
    });

  }

  getUserRefById(uid: string): DocumentReference{
    return this.afs.doc('/users/' + uid).ref;
  }
  updateUserGroup(uid: string, group: number): Promise<void> {
    return this.afs.collection('users').doc(uid).update({ group });
  }

  updateUserActive(uid: string, isActive: boolean): Promise<void> {
    return this.afs.collection('users').doc(uid).update({ isActive });
  }
  updateUserIsTeacher(uid: string, isTeacher: boolean): Promise<void> {
    return this.afs.collection('users').doc(uid).update({ isTeacher });
  }

  get timestamp(): firebase.default.firestore.Timestamp {
    return firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp;
  }
}
