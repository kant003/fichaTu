import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EnrollmentJustificationsComponent } from '../enrollment-justifications/enrollment-justifications.component';

export interface DialogDataSchedule {
  idEnrollment: string;
  idJustification: string;
}

@Component({
  selector: 'app-enrollment-justification-show-file',
  templateUrl: './enrollment-justification-show-file.component.html',
  styleUrls: ['./enrollment-justification-show-file.component.css']
})
export class EnrollmentJustificationShowFileComponent implements OnInit {
  profileUrl$: Observable<string | null>;

  constructor(
    public dialogRef: MatDialogRef<EnrollmentJustificationsComponent>,
    private readonly storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSchedule
  ) {
    const ref = this.storage.ref(data.idEnrollment + '/' + data.idJustification);
    this.profileUrl$ = ref.getDownloadURL();
  }

  ngOnInit(): void {
  }

}
