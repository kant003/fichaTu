export interface Schedule {
  id?: string;
  dayOfWeek: number; // Sunday as 0 and Saturday as 6. As momentjs
  startTime: firebase.default.firestore.Timestamp;
  finishTime: firebase.default.firestore.Timestamp;
}
