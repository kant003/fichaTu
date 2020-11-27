import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { Schedule } from 'src/app/models/schedule';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SubjectService } from 'src/app/services/subject.service';

export interface DialogDataSchedule {
  idSubject: string;
}
@Component({
  selector: 'app-subject-schedule-add-dialog',
  templateUrl: './subject-schedule-add-dialog.component.html',
  styleUrls: ['./subject-schedule-add-dialog.component.css']
})
export class SubjectScheduleAddDialogComponent implements OnInit {

  private HHmmValidator = Validators.pattern(/^([0-9]|0[0-9]|1?[0-9]|2[0-3]):[0-5]?[0-9]$/);
  form = this.formBuilder.group({
    dayOfWeek: ['', Validators.required],
    startTime: ['', this.HHmmValidator],
    finishTime: ['', this.HHmmValidator],
  });

  constructor(
    public dialogRef: MatDialogRef<SubjectScheduleAddDialogComponent>,
    private subjectService: SubjectService,
    private snackBarService: SnackBarService,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSchedule) {

  }

  ngOnInit(): void {

  }

  public onSubmit(): void {
    const schedule: Schedule = {
      dayOfWeek: Number.parseInt(this.form.value.dayOfWeek, 10),
      startTime: this.toTimestamp(this.form.value.startTime),
      finishTime: this.toTimestamp(this.form.value.finishTime),
    };
    this.subjectService.addSchedule(this.data.idSubject, schedule).then(
      () => this.snackBarService.info('Horario guardado correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hoy(): Date {
    return new Date();
  }

  toTimestamp(hoursAndMinutes: string): firebase.default.firestore.Timestamp {
    const time = hoursAndMinutes.split(':');

    const startDate = new Date(
      1970, // Year
      0, // Month
      1, // Date
      parseInt(time[0], 10),
      parseInt(time[1], 10),
    );
    return firebase.default.firestore.Timestamp.fromDate(startDate);
  }
}
