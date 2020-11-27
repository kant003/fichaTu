import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Justification } from 'src/app/models/justification';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { JustificationService } from '../../services/justification.service';
import { JustificationAddDialogComponent } from '../justification-add-dialog/justification-add-dialog.component';

@Component({
  selector: 'app-justifications',
  templateUrl: './justifications.component.html',
  styleUrls: ['./justifications.component.css']
})
export class JustificationsComponent implements OnInit {

  justifications$: Observable<Justification[]>;
  idEnrollment: string;
  displayedColumns: string[] = ['icono', 'createdAt', 'date', 'description', 'delete'];

  constructor(
    private justificationService: JustificationService, route: ActivatedRoute,
    public snackBarService: SnackBarService, public dialog: MatDialog ) {

    this.idEnrollment = route.snapshot.paramMap.get('id') as string;
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
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(JustificationAddDialogComponent, {
      data: {
        idEnrollment: this.idEnrollment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
