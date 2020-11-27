import { DocumentReference } from '@angular/fire/firestore';

export interface Sing2 {
  id?: string;
  createdAt: firebase.default.firestore.Timestamp;
  ip: string;

  refUser: DocumentReference;
  refSubject: DocumentReference;
  refEnrollment: DocumentReference;
  refSchedule: DocumentReference;

  dayOfWeek: number|null; // Sunday as 0 and Saturday as 6. As momentjs
  startTime: firebase.default.firestore.Timestamp|null;
  finishTime: firebase.default.firestore.Timestamp|null;
}

