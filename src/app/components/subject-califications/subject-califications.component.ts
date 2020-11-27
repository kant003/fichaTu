import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Calification } from 'src/app/models/calification';
import { Enrollment } from 'src/app/models/enrollments';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { SubjectService } from 'src/app/services/subject.service';
import { CalificationService } from '../../services/calification.service';

@Component({
  selector: 'app-subject-califications',
  templateUrl: './subject-califications.component.html',
  styleUrls: ['./subject-califications.component.scss']
})
export class SubjectCalificationsComponent implements OnInit {

  enrollments$: Observable<Enrollment[]>;

  constructor(
    private subjectService: SubjectService,
    private enrollmentService: EnrollmentService,
    private calificationService: CalificationService,
    private afs: AngularFirestore,
    route: ActivatedRoute,
  ) {
    const idSubject = route.snapshot.paramMap.get('id') as string;
    this.enrollments$ = enrollmentService.getEnrollmentsBySubjectIdOrderedByPos(idSubject);

  }

  ngOnInit(): void {
  }

  addColumnCalifications(): void {
    const name = prompt('Nombre de la columna a añadir');

    this.enrollments$.subscribe(enrollments => {
      enrollments.forEach(enrollment => {
        const calification: Calification = {
          name: name || '',
          value: null,
          trimester: 1,
          createdAt: firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp,
        };
        if (!enrollment.id) { return; }
        this.calificationService.add(enrollment.id, calification);
        console.log('add cali');
      });
    });

  }

  removeColumnCalifications(): void {
    const name = prompt('Nombre de la columna a borrar');
    if (!name) { return; }
    this.enrollments$.subscribe(enrollments => {
      enrollments.forEach(enrollment => {
        if (!enrollment.id) { return; }
        console.log('elimna cali');
        this.calificationService.deleteCalificationByName(enrollment.id, name);
      });
    });
  }


}
