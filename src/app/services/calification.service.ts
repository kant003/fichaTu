import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calification } from '../models/calification';
import { Enrollment } from '../models/enrollments';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CalificationService {

  constructor(private afs: AngularFirestore) {
  }

  getCalificationsByIdEnrollmentOrderByCreatedAt(idEnrollment: string): Observable<Calification[]> {
    return this.afs.doc<User>('enrollments/' + idEnrollment).collection('califications', ref => ref.orderBy('createdAt'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ) as Observable<Calification[]>;
  }

  add(idEnrollment: string, calification: Calification): Promise<DocumentReference> {
    return this.afs.collection<Enrollment>('enrollments').doc(idEnrollment).collection<Calification>('califications').add(calification);
  }

  async deleteCalificationByName(idEnrollment: string, name: string) {
    const batch = this.afs.firestore.batch();

    const qs = this.afs.collection<Enrollment>('enrollments').doc(idEnrollment)
      .collection<Calification>('califications', ref => ref.where('name', '==', name))

    await qs.get().forEach(e => {
      e.docs.forEach(doc => {
        console.log('m:', doc.id);
        batch.delete(doc.ref);
      });
    });

    batch.commit();

  }

  delete(idEnrollment: string, idCalification: string): Promise<void> {
    return this.afs.collection<Enrollment>('enrollments').
      doc(idEnrollment).collection<Calification>('califications').doc(idCalification).delete();
  }

}
