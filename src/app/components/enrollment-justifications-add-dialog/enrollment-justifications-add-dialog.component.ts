import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { JustificationService } from '../../services/justification.service';
import { Justification } from 'src/app/models/justification';
import { EnrollmentJustificationsComponent } from '../enrollment-justifications/enrollment-justifications.component';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';        // for authentication
export interface DialogDataSchedule {
  idEnrollment: string;
  date: Date;
}
@Component({
  selector: 'app-enrollment-justifications-add-dialog',
  templateUrl: './enrollment-justifications-add-dialog.component.html',
  styleUrls: ['./enrollment-justifications-add-dialog.component.css']
})
export class EnrollmentJustificationsAddDialogComponent implements OnInit {
  public porcentaje = 0;
  public finalizado = false;
  public nombreArchivo = '';
  public progressValue = 0;

  form = this.formBuilder.group({
    date: [this.data.date, Validators.required],
    description: ['', Validators.required],
    photo: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<EnrollmentJustificationsComponent>,
    private readonly justificationService: JustificationService,
    private readonly snackBarService: SnackBarService,
    private readonly formBuilder: FormBuilder,
    private readonly storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSchedule) {
  }

  ngOnInit(): void {
  }


  public onChangeFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      const file = files[0];
      this.form.patchValue({ photo: file });
    }
  }


  private saveJustification(newIdJustification: string): void{
    const justification: Justification = {
      state: 'pendiente',
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp,
      date: firebase.default.firestore.Timestamp.fromDate(this.form.value.date.toDate()),
      description: this.form.value.description,
    };

    this.justificationService.addJustificationGeneratedId(this.data.idEnrollment, justification, newIdJustification).then(
      () => this.snackBarService.info('La justificación se ha guardado correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );

  }

  public onSubmit(): void {
    const newIdJustification = this.justificationService.generateId();
    const task = this.storage.upload(this.data.idEnrollment + '/' + newIdJustification, this.form.value.photo);

    task.percentageChanges().subscribe(porcentaje => {
      if (porcentaje === undefined) { porcentaje = 0; }
      this.porcentaje = Math.round(porcentaje);
      this.progressValue = Math.round(porcentaje);
      if (this.porcentaje === 100) {
        this.finalizado = true;
      }
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        this.saveJustification(newIdJustification);
        this.dialogRef.close();
      })
    ).subscribe();

  }

/*  toModel(ngbDate: any): firebase.default.firestore.Timestamp {
    const jsDate = new Date(
      ngbDate.year ? ngbDate.year : new Date().getFullYear(),
      ngbDate.month ? ngbDate.month - 1 : new Date().getMonth() - 1,
      ngbDate.day ? ngbDate.day : new Date().getDate(),
      12
    );
    return firebase.default.firestore.Timestamp.fromDate(jsDate);
  }

  fromModel(ts: firebase.default.firestore.Timestamp): moment.Moment | null {
    if (ts instanceof firebase.default.firestore.Timestamp) {
      return moment(ts.toDate());
    } else {
      return null;
    }
  }*/

  onNoClick(): void {
    this.dialogRef.close();
  }

}
