import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollments';
import { Ip } from 'src/app/models/ip';
import { Sing } from 'src/app/models/sing';
import { EnrollmentService } from 'src/app/services/enrollment.service';
import { IpService } from 'src/app/services/ip.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import * as firebase from 'firebase/app';
import { SingService } from '../../services/sing.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-enrollments-list',
  templateUrl: './user-enrollments-list.component.html',
  styleUrls: ['./user-enrollments-list.component.css']
})
export class UserEnrollmentsListComponent implements OnInit {
  @Input() idUser!: string;
  enrollements$!: Observable<Enrollment[]>;
  //ipClient$: Observable<Ip>;

  constructor(
    public enrollmentService: EnrollmentService,
    private singService: SingService,
    private snackBarService: SnackBarService,
    private ipService: IpService) {
    //this.ipClient$ = this.ipService.getClientIp();
  }

  ngOnInit(): void {
    this.enrollements$ = this.enrollmentService.getEnrollmentsByUserId(this.idUser);
  }

  getTextButton(active: boolean): void {
  }

  sing(/*event: MouseEvent, */b: MatButton, enrollmentId: string | undefined): void {
    // event.target.value = 'fichando...';
    // (event.target as HTMLButtonElement).disabled = true;
    // (event.target as HTMLButtonElement).value = 'fi';
    if (enrollmentId === undefined) { return; }
    const sing: Sing = {
      createdAt: firebase.firestore.FieldValue.serverTimestamp() as firebase.firestore.Timestamp, // TODO: Facilmente hackeable
      ip: this.ipService.ip
    };
    console.log('fichando...');

    this.singService.sing(enrollmentId, sing).then(
      () => {
        //console.log(event);
        //event.target.disabled = false;
        b.disabled = true;
        this.snackBarService.info('Fichaje realizado con éxito', 'Cerrar')
      },
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );

  }

}
