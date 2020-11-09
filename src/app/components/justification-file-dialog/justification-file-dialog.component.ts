import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserEnrollmentJustificationsComponent } from '../user-enrollment-justifications/user-enrollment-justifications.component';

export interface DialogDataSchedule {
  idEnrollment: string;
  idJustification: string;
}

@Component({
  selector: 'app-justification-file-dialog',
  templateUrl: './justification-file-dialog.component.html',
  styleUrls: ['./justification-file-dialog.component.css']
})
export class JustificationFileDialogComponent implements OnInit {
  profileUrl: Observable<string | null>;

  constructor(
    public dialogRef: MatDialogRef<UserEnrollmentJustificationsComponent>,
    private readonly storage: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSchedule
  ) {
    const ref = this.storage.ref(data.idEnrollment + '/' + data.idJustification);
    this.profileUrl = ref.getDownloadURL();
  }

  ngOnInit(): void {
  }

}
