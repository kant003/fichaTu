import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enrollment } from '../models/enrollments';
import { Justification } from '../models/justification';

@Injectable({
  providedIn: 'root'
})
export class JustificationService {

  constructor(private afs: AngularFirestore) { }


  getJustificationsByIdEnrollment(idEnrollment: string): Observable<Justification[]>{
    return this.afs.collection<Enrollment>('enrollments').doc(idEnrollment)
      .collection<Justification>('justifications').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  generateId(): string{
    return this.afs.createId();
  }

  addJustificationGeneratedId(idEnrollment: string, justification: Justification, newId: string): Promise<void>{
    return this.afs.collection('enrollments').doc(idEnrollment)
    .collection<Justification>('justifications').doc<Justification>(newId).set(justification);
    // return this.afs.collection<Enrollment>('enrollments').doc(idEnrollment)
    //.collection<Justification>('justifications').add(justification);
   }

  deleteJustification(idEnrollment: string, idJustification: string): Promise<void> {
     return this.afs.collection<Enrollment>('enrollments').doc(idEnrollment)
      .collection<Justification>('justifications').doc(idJustification).delete();
  }

}
