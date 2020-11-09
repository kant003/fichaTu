import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollments';
import { Subject } from 'src/app/models/subject';
import { SnackBarService } from '../../services/snack-bar.service';
import { SubjectService } from '../../services/subject.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-enrollments-edit',
  templateUrl: './user-enrollments-edit.component.html',
  styleUrls: ['./user-enrollments-edit.component.css']
})
export class UserEnrollmentsEditComponent implements OnInit {
  idAlumno: string;

  enrollments$: Observable<Enrollment[]>;
  subjects$: Observable<Subject[]>;

  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  enrollmentCtrl = new FormControl();

  @ViewChild('enrollmentInput') enrollmentInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    private snackBarService: SnackBarService, route: ActivatedRoute,
    private userService: UserService, private subjectService: SubjectService, private enrollmentService: EnrollmentService) {

    this.idAlumno = route.snapshot.paramMap.get('id') as string;

    this.subjects$ = subjectService.getAllSubjects();
    this.enrollments$ = enrollmentService.getEnrollmentsByUserId(this.idAlumno);
  }

  ngOnInit(): void {
    this.enrollments$ = this.enrollmentService.getEnrollmentsByUserId(this.idAlumno);

  }

  enroll(idSubject: string): void {
    const enrollment: Enrollment = {
      user: null,
      subject: null,
      refUser: this.userService.getUserRefById(this.idAlumno),
      refSubject: this.subjectService.getSubjectRefById(idSubject),
      pos: 0
    };
    this.enrollmentService.addEnrollment(enrollment).then(
      () => this.snackBarService.info('Matriculación realizada con éxito', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  deEnroll(idEnrollment: string): void {
    this.enrollmentService.deleteEnrollment(idEnrollment).then(
      () => this.snackBarService.info('El alumno ha sido desmatriculado', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  encuentra(subjectId: string) {
    return (e: Enrollment) => e.refSubject.id === subjectId;
  }

  encuentra2(enrollments: Enrollment[] | null, subjectId: string | undefined): Enrollment | undefined{
    //if(subjectId === undefined) {return null;}
    return enrollments?.find(e => e.refSubject.id === subjectId);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log('add', input, value);

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.enrollmentCtrl.setValue(null);
  }


  remove(enrollment: Enrollment): void {
    this.deEnroll(enrollment.id as string);

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.enrollmentInput.nativeElement.value = '';
    this.enrollmentCtrl.setValue(null);
    const idSubject = event.option.value.id;
    this.enroll(idSubject);
  }

}

