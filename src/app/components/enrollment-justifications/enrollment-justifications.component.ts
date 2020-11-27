import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Justification } from 'src/app/models/justification';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { JustificationService } from '../../services/justification.service';
import { EnrollmentJustificationsAddDialogComponent } from '../enrollment-justifications-add-dialog/enrollment-justifications-add-dialog.component';
import { EnrollmentJustificationShowFileComponent } from '../enrollment-justification-show-file/enrollment-justification-show-file.component';

@Component({
  selector: 'app-enrollment-justifications',
  templateUrl: './enrollment-justifications.component.html',
  styleUrls: ['./enrollment-justifications.component.css']
})
export class EnrollmentJustificationsComponent implements OnInit {

  justifications$: Observable<Justification[]>;
  idEnrollment: string;
  displayedColumns: string[] = ['icono', 'state', 'createdAt', 'date', 'description', 'photo', 'delete'];

  constructor(
    private justificationService: JustificationService,
    route: ActivatedRoute,
    public snackBarService: SnackBarService,
    public dialog: MatDialog,
    private readonly storage: AngularFireStorage) {


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
    const dialogRef = this.dialog.open(EnrollmentJustificationsAddDialogComponent, {
      data: {
        idEnrollment: this.idEnrollment,
        date: new Date()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openDialogFile(idJustification: string): void {
    const dialogRef = this.dialog.open(EnrollmentJustificationShowFileComponent, {
      data: {
        idEnrollment: this.idEnrollment,
        idJustification
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
