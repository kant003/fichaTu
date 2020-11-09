import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/models/schedule';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectScheduleAddDialogComponent } from '../subject-schedule-add-dialog/subject-schedule-add-dialog.component';

@Component({
  selector: 'app-subject-schedule',
  templateUrl: './subject-schedule.component.html',
  styleUrls: ['./subject-schedule.component.css']
})
export class SubjectScheduleComponent implements OnInit {
  schedules$: Observable<Schedule[]>;
  idSubject: string;
  displayedColumns: string[] = ['icono', 'day', 'start', 'finish', 'delete'];

  constructor(
    private subjectService: SubjectService, route: ActivatedRoute,
    public snackBarService: SnackBarService, public dialog: MatDialog ) {

    this.idSubject = route.snapshot.paramMap.get('id') as string;
    this.schedules$ = subjectService.getSchedulesByIdSubject(this.idSubject);
   }

  ngOnInit(): void {
  }


  deleteItem(idSchedule: string): void {
    if (!window.confirm('¿Estás seguro de que quieres borrar este horario?')) {
      return;
    }
    this.subjectService.deleteSchedule(this.idSubject, idSchedule).then(
      () => this.snackBarService.info('Horario borrado correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubjectScheduleAddDialogComponent, {
      data: {
        idSubject: this.idSubject
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
