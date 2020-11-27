export interface Calification {
  id?: string;
  name: string;
  value: number | null;
  trimester: number;
  comment?: string;
  createdAt: firebase.default.firestore.Timestamp;
}
