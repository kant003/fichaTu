
export interface Justification {
  id?: string;
  createdAt: firebase.default.firestore.Timestamp;
  date: firebase.default.firestore.Timestamp;
  description: string;
  state: string;
}

