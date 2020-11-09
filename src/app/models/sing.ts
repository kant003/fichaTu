import { firestore } from 'firebase';

export interface Sing {
  id?: string;
  createdAt: firestore.Timestamp;
  ip: string;
}

