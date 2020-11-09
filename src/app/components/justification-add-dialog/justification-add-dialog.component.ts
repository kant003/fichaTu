import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { JustificationService } from '../../services/justification.service';
import { firestore } from 'firebase';
import * as firebase from 'firebase';
import { Justification } from 'src/app/models/justification';

export interface DialogDataSchedule {
  idEnrollment: string;
}

@Component({
  selector: 'app-justification-add-dialog',
  templateUrl: './justification-add-dialog.component.html',
  styleUrls: ['./justification-add-dialog.component.css']
})
export class JustificationAddDialogComponent implements OnInit {


  form = this.formBuilder.group({
    date: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<JustificationAddDialogComponent>,
    private justificationService: JustificationService,
    private snackBarService: SnackBarService,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSchedule) {

  }

  ngOnInit(): void {

  }

  public onSubmit(): void {
    const justification: Justification = {
      state: 'pendiente',
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firestore.Timestamp,
      date: this.form.value.date,
      description: this.form.value.description,
    };
    /*this.justificationService.addJustification(this.data.idEnrollment, justification).then(
      () => this.snackBarService.info('La justificación se ha guardado correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );*/
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hoy(): Date {
    return new Date();
  }
}
