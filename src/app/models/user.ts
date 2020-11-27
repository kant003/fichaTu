
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
  updatedAt: firebase.default.firestore.Timestamp;
  createdAt: firebase.default.firestore.Timestamp;
}
