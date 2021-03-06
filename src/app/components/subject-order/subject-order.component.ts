import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollments';
import { Subject } from 'src/app/models/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { EnrollmentService } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-subject-order',
  templateUrl: './subject-order.component.html',
  styleUrls: ['./subject-order.component.css']
})
export class SubjectOrderComponent implements OnInit {
  // @Input() idSubject: string;

  enrollments$: Observable<Enrollment[]>;
  subject$: Observable<Subject>;

  constructor(
    route: ActivatedRoute, private snackBarService: SnackBarService,
    private enrollmentService: EnrollmentService, subjectService: SubjectService) {

    const idSubject = route.snapshot.paramMap.get('id') as string;

    this.enrollments$ = enrollmentService.getEnrollmentsBySubjectIdOrderedByPos(idSubject);
    this.subject$ = subjectService.getSubjectById(idSubject);
  }

  ngOnInit(): void {
  }


  onChangePosition(event: Event, enrollmentId: string | undefined): void {
    if (enrollmentId === undefined) { return; }

    const value = (event.target as HTMLInputElement).value;
    let newPos = parseInt(value, 10);
    if (!newPos) { newPos = 0; }

    this.enrollmentService.updateEnrollment(enrollmentId, { pos: newPos }).then(
      () => this.snackBarService.info('Posicion del alumno cambiada correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

}
