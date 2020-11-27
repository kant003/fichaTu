import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Calification } from 'src/app/models/calification';
import { Enrollment } from 'src/app/models/enrollments';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CalificationService } from '../../services/calification.service';

@Component({
  selector: 'app-user-enrollment-califications',
  templateUrl: './user-enrollment-califications.component.html',
  styleUrls: ['./user-enrollment-califications.component.scss']
})
export class UserEnrollmentCalificationsComponent implements OnInit {

  califications$!: Observable<Calification[]>;

  // @Input() idUser!: string;
  @Input() idEnrollment!: string;

  form = this.formBuilder.group({
    name: ['', Validators.required],
    value: ['', Validators.required],
  });

  constructor(
    private calificationService: CalificationService,
    private snackBarService: SnackBarService,
    public formBuilder: FormBuilder,
    private afs: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    // NOTA: no poner en el constructor
    this.califications$ = this.calificationService.getCalificationsByIdEnrollmentOrderByCreatedAt(this.idEnrollment);
  }


  onChangeValue(event: Event, idCalification: string | undefined): void {
    if (idCalification == null) { return; }
    if (this.idEnrollment == null) { return; }
    const value = (event.target as HTMLInputElement).value;

    const a = this.afs.collection<Enrollment>('enrollments')
      .doc(this.idEnrollment).collection<Calification>('califications')
      .doc(idCalification).update({ value });
    a.then(
        () => this.snackBarService.info('Calificación cambiada correctamente', 'Cerrar'),
        error => this.snackBarService.error('Error:' + error, 'Cerrar')
      );
  }
  /*onChangePosition(event: Event, enrollmentId: string | undefined): void {
    if (enrollmentId === undefined) { return; }

    const value = (event.target as HTMLInputElement).value;
    let newPos = parseInt(value, 10);
*/
  remove(idEnrollment: string, idCalification: string): void {
    /* if (!window.confirm('Estas seguro de que quieres borrar esta calificación?')) {
       return;
     }
     this.calificationService.delete(idEnrollment, idCalification).then(
       () => this.snackBarService.info('Calificación borrada correctamente', 'Cerrar'),
       error => this.snackBarService.error('Error:' + error, 'Cerrar')
     );*/
  }

  public onSubmit(): void {
    /*const calification: Calification = {
      name: this.form.value.name,
      value: Number.parseFloat(this.form.value.value),
      trimester: 1,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp,
    };
    this.calificationService.add(this.idEnrollment, calification).then(
      () => this.snackBarService.info('Calificación guardada correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );*/
  }



}
