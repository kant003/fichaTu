import { Component, EventEmitter, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { Observable, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from '../../services/subject.service';
import { SubjectAddDialogComponent } from '../subject-add-dialog/subject-add-dialog.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';
import * as firebase from 'firebase/app';

import * as moment from 'moment';
import { debounceTime, map, takeWhile, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

// TODO: añadir ng-container en todos los demas componenetes
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects2$: Observable<Subject[]>;
  displayedColumns: string[] = ['icono', 'name', 'createdAt', 'permit', 'sing', 'order', 'qualify', 'schedules', 'delete'];
  filter = new FormControl('');

  constructor(
    public dialog: MatDialog, private snackBarService: SnackBarService,
    private subjectService: SubjectService) {

    this.subjects2$ =  this.subjectService.getSubjectsPaginatedFilterName().pipe(
      map(e => {
        e.map(v => {
          v.act$ = timer(0, 1000).pipe<number>(
            map((t: number) => {
              if (v.deadLine === undefined) { return 0; }
              const deadLine = moment(v.deadLine.toDate());
              const now = moment();
              return deadLine.diff(now, 'seconds') as number;
            })
          );
        });
        return e;
      })
    );

    this.filter.valueChanges.pipe(debounceTime(400))
      .subscribe(filter => this.applyFilter(filter));
  }

  ngOnInit(): void {
  }

  deleteItem(id: string): void {
    if (!window.confirm('Estas seguro de que quieres borrar esta asignatura y todos sus datos asociados?')) {
      return;
    }
    this.subjectService.deleteSubject(id).then(
      () => this.snackBarService.info('Asignatura borrada correctamente', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }


  onCanSing(subjectId: string): void {
    const timeAllowed = 60 * 4;
    const deadLine = firebase.default.firestore.Timestamp.fromDate(moment().add(timeAllowed, 'seconds').toDate());
    this.subjectService.updateSubject(subjectId, { deadLine }).then(
      () => this.snackBarService.info(`Durante ${timeAllowed} segundos, el alumno podrá fichar`, 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );

  }
  onCanNotSing(subjectId: string): void {
    const deadLine = firebase.default.firestore.Timestamp.fromDate(moment().subtract(1, 'days').toDate());

    this.subjectService.updateSubject(subjectId, { deadLine }).then(
      () => this.snackBarService.info('Ya no permites que el alumno fiche', 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );

  }

  canSing(n: number | null): boolean {
    if (n === null) { return false; }
    else { return n > 0; }
  }

  /*applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subjectService.initPage();
    this.subjectService.nameFilter$.next(filterValue);
  }*/
  applyFilter(filterValue: string): void {
    this.subjectService.initPage();
    this.subjectService.nameFilter$.next(filterValue);
  }

  nextPage(array: Subject[]): void {
    const ultimo = array[array.length - 1];
    if (ultimo) {
      this.subjectService.nextPage(ultimo.name as string);
    } else {
      this.subjectService.initPage();
    }
  }

  prevPage(array: Subject[]): void {
    const primero = array[0];
    if (primero) {
      this.subjectService.prevPage(primero.name as string);
    } else {
      this.subjectService.initPage();
    }
  }

  onChangePageSize(event: MatSelectChange): void {
    this.subjectService.pageSize$.next(parseInt(event.value, 10));
    this.subjectService.initPage();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubjectAddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


 /* fromModel(ts: firebase.default.firestore.Timestamp): moment.Moment | null {
    if (ts instanceof firebase.default.firestore.Timestamp) {
      return moment(ts.toDate());
    } else {
      return null;
    }
  }*/

  // toModel(ngbDate: any): firebase.default.firestore.Timestamp {
  //   const jsDate = new Date(
  //     ngbDate.year ? ngbDate.year : new Date().getFullYear(),
  //     ngbDate.month ? ngbDate.month - 1 : new Date().getMonth() - 1,
  //     ngbDate.day ? ngbDate.day : new Date().getDate(),
  //     ngbDate.hours ? ngbDate.hours : new Date().getHours(),
  //     ngbDate.minutes ? ngbDate.minutes : new Date().getMinutes(),
  //     ngbDate.seconds ? ngbDate.seconds : new Date().getSeconds(),
  //   );
  //   return firebase.default.firestore.Timestamp.fromDate(jsDate);
  // }

}
