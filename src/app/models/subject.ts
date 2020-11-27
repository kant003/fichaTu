import { Observable } from 'rxjs';

export interface Subject {
  id?: string;
  name: string;
  active?: boolean;
  deadLine?: firebase.default.firestore.Timestamp;
  createdAt?: firebase.default.firestore.Timestamp;
  // countDown?:any;
  act$?: Observable<number>;
}
