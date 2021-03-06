import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollments';
import { EnrollmentService } from 'src/app/services/enrollment.service';


export interface DialogData {
  idAlumno: string;
}

@Component({
  selector: 'app-user-enrollment-select-dialog',
  templateUrl: './user-enrollment-select-dialog.component.html',
  styleUrls: ['./user-enrollment-select-dialog.component.css']
})
export class UserEnrollmentSelectDialogComponent implements OnInit {

  userEnrollements$: Observable<Enrollment[]>;
  idAlumno: string;

  constructor(
    public enrollmentService: EnrollmentService,
    public dialogRef: MatDialogRef<UserEnrollmentSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.idAlumno = data.idAlumno;
    this.userEnrollements$ = this.enrollmentService.getEnrollmentsByUserId(data.idAlumno);
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
