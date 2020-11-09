import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SubjectService } from '../../services/subject.service';
import { SubjectAddDialogComponent } from '../subject-add-dialog/subject-add-dialog.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects$: Observable<Subject[]>;
  displayedColumns: string[] = ['icono', 'name', 'createdAt', 'permit', 'sing', 'order', 'schedules', 'delete'];

  constructor(
    public dialog: MatDialog, private snackBarService: SnackBarService,
    private subjectService: SubjectService) {
    this.subjects$ = this.subjectService.getSubjectsPaginatedFilterName();
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

  activaFichaje(event: MatSlideToggleChange, subjectId: string): void {
    const msg = event.source.checked ?
      'Los alumnos ya pueden fichar en esta asignatura' : 'Los alumnos NO pueden fichar en esta asignatura';
    this.subjectService.updateSubject(subjectId, { active: event.source.checked }).then(
      () => this.snackBarService.info(msg, 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
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

}
