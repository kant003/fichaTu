import { firestore } from 'firebase';

export interface Subject {
  id?: string;
  name: string;
  active?: boolean;
  createdAt?: firestore.Timestamp;
}
