import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SubjectService } from 'src/app/services/subject.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-subject-add-dialog',
  templateUrl: './subject-add-dialog.component.html',
  styleUrls: ['./subject-add-dialog.component.css']
})
export class SubjectAddDialogComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<SubjectAddDialogComponent>,
    private subjectService: SubjectService,
    private snackBarService: SnackBarService,
    public formBuilder: FormBuilder) {

    }

  ngOnInit(): void {

  }

  public onSubmit(): void {
    const subject: Subject = {
      name: this.form.value.name,
      active: false,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp() as firebase.default.firestore.Timestamp
    };
    this.subjectService.addSubject(subject).then(
      () => this.snackBarService.info('Asignatura guardada correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
    this.dialogRef.close();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
