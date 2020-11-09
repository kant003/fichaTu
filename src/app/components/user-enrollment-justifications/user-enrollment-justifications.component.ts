import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Justification } from 'src/app/models/justification';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { JustificationService } from '../../services/justification.service';
import { JustificationAddDialogComponent } from '../justification-add-dialog/justification-add-dialog.component';
import { UserEnrollmentJustificationsAddDialogComponent } from '../user-enrollment-justifications-add-dialog/user-enrollment-justifications-add-dialog.component';
import { JustificationFileDialogComponent } from '../justification-file-dialog/justification-file-dialog.component';

@Component({
  selector: 'app-user-enrollment-justifications',
  templateUrl: './user-enrollment-justifications.component.html',
  styleUrls: ['./user-enrollment-justifications.component.css']
})
export class UserEnrollmentJustificationsComponent implements OnInit {

  justifications$: Observable<Justification[]>;
  idUser: string;
  idEnrollment: string;
  displayedColumns: string[] = ['icono', 'state', 'createdAt', 'date', 'description', 'photo', 'delete'];

  constructor(
    private justificationService: JustificationService,
    route: ActivatedRoute,
    public snackBarService: SnackBarService,
    public dialog: MatDialog,
    private readonly storage: AngularFireStorage) {


    this.idUser = route.snapshot.paramMap.get('idUser') as string;
    this.idEnrollment = route.snapshot.paramMap.get('idEnrollment') as string;
    this.justifications$ = justificationService.getJustificationsByIdEnrollment(this.idEnrollment);
  }

  ngOnInit(): void {
  }


  deleteItem(idJustification: string): void {
    if (!window.confirm('¿Estás seguro de que quieres borrar esta justificación?')) {
      return;
    }
    this.justificationService.deleteJustification(this.idEnrollment, idJustification).then(
      () => this.snackBarService.info('Justificación borrada correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );

    this.storage.storage.ref(this.idEnrollment + '/' + idJustification).delete();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserEnrollmentJustificationsAddDialogComponent, {
      data: {
        idEnrollment: this.idEnrollment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openDialogFile(idJustification: string): void {
    const dialogRef = this.dialog.open(JustificationFileDialogComponent, {
      data: {
        idEnrollment: this.idEnrollment,
        idJustification
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
  getDownloadImage(justification: Justification): Observable<string | null> {
    return this.storage.ref('PrB7pK8UbUii6hIEaAPD/PpqTaDJ8waP2tejaz0bn').getDownloadURL();
  }
}
