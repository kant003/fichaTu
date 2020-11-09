import { firestore } from 'firebase';

export interface User {
  uid: string;
  email: string;
  // nombre?: string;
  // apellidos?: string;
  displayName?: string;
  photoURL?: string;
  isAdmin?: boolean;
  isTeacher?: boolean;
  isActive?: boolean;
  // idHuella?: number;
  group?: number;
  updatedAt: firestore.Timestamp;
  createdAt: firestore.Timestamp;
}
