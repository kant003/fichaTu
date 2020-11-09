import { firestore } from 'firebase';

export interface Justification {
  id?: string;
  createdAt: firestore.Timestamp;
  date: firestore.Timestamp;
  description: string;
  state: string;
}

