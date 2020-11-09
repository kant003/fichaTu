import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

  form = this.formBuilder.group({
    dayOfWeek: ['', Validators.required],
    start: ['', Validators.required],
    finish: ['', Validators.required],
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
      start: this.form.value.start,
      finish: this.form.value.finish,
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
}
