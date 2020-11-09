import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Group } from 'src/app/models/group';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UserEnrollmentListDialogComponent } from '../user-enrollment-list-dialog/user-enrollment-list-dialog.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]>;
  displayedColumns: string[] = ['photoURL', 'displayName', 'email', 'updatedAt', 'group', 'activo', 'sings', 'subjects'];

  public name = '';
  public email = '';

  Group = Group;
  public errorObject: Object|null = null;

  constructor(
    private userService: UserService, public snackBarService: SnackBarService,
    public dialog: MatDialog
  ) {
    this.users$ = userService.getUsersPaginatedFilterNameAndEmail();
    this.users$.pipe(
      catchError(err => {
          this.errorObject = err;
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
      })
    );
  }

  ngOnInit(): void {

  }

  nextPage(array: User[]): void {
    const ultimo = array[array.length - 1];
    if (ultimo) {
      this.userService.nextPage(ultimo.email);
    } else {
      this.userService.initPage();
    }
  }
  prevPage(array: User[]): void {
    const primero = array[0];
    if (primero) {
      this.userService.prevPage(primero.email);
    } else {
      this.userService.initPage();
    }
  }
  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userService.initPage();
    this.userService.nameFilter$.next(filterValue);
  }

  onChangePageSize(event: MatSelectChange): void {
    this.userService.pageSize$.next(parseInt(event.value, 10));
    this.userService.initPage();
  }

  onChangeActive(event: MatSlideToggleChange, uid: string): void {
    const msg = event.source.checked ? 'El alumno puede usar la aplicación' : 'El alumno ya NO puede usar la plataforma';
    this.userService.updateUserActive(uid, event.source.checked).then(
      () => this.snackBarService.info(msg, 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  onChangeGroup(event: MatSelectChange, uid: string): void {
    let group = parseInt(event.value, 10);
    if (!group) { group = Group.A; }

    this.userService.updateUserGroup(uid, group).then(
      () => this.snackBarService.info(`Alumno cambiado al grupo ${group === 0 ? 'A' : 'B'} correctamente`, 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  openDialog(idAlumno: string): void {
    console.log('open uid:', idAlumno);
    this.dialog.open(UserEnrollmentListDialogComponent, {
      data: {
        idAlumno
      }
    });
  }

}

