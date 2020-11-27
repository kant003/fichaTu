import { Subject } from './subject';
import { User } from 'src/app/models/user';
import { DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Sing } from './sing';

export interface Enrollment {
  id?: string;
  refUser: DocumentReference;
  user: Observable<User> | null;
  refSubject: DocumentReference;
  subject: Observable<Subject> | null;
  pos: number;
  sings?: Observable<Sing[]>;
  realUser?: User;
  realSubject?: Subject;

}
