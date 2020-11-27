import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Enrollment } from 'src/app/models/enrollments';
import { Schedule } from 'src/app/models/schedule';
import { Subject } from 'src/app/models/subject';
import { EnrollmentService } from '../../services/enrollment.service';
import { SubjectService } from '../../services/subject.service';
import { SingService } from '../../services/sing.service';
import { Observable} from 'rxjs';

import { InfoSchedule } from 'src/app/models/infoSchedules';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Sing } from 'src/app/models/sing';
import { MatDialog } from '@angular/material/dialog';
import { Sing2 } from 'src/app/models/sing2';
import { EnrollmentJustificationsAddDialogComponent } from '../enrollment-justifications-add-dialog/enrollment-justifications-add-dialog.component';

interface InfoScheduleData {
  name: string;
  startTime: firebase.default.firestore.Timestamp;
  finishTime: firebase.default.firestore.Timestamp;
  idSubject: string;
  idEnrollment: string;
}

interface InfoSingsData {
  createdAt: firebase.default.firestore.Timestamp;
  idSubject: string;
}
@Component({
  selector: 'app-user-sings',
  templateUrl: './user-sings.component.html',
  styleUrls: ['./user-sings.component.css']
})
export class UserSingsComponent implements OnInit {
  idUser: string;
  date = moment(new Date()) as moment.Moment; //TODO: momet()
  public sings$: Observable<InfoSchedule[]>;
  public sings2$: Observable<Sing2[]>;
  public schedulesList: InfoScheduleData[] = [];
  public singsList: InfoSingsData[] = []
  public noPair: InfoSingsData[] = []

  constructor(private enrollmentService: EnrollmentService,
    private subjectService: SubjectService,
    private singService: SingService,
    route: ActivatedRoute,
    public dialog: MatDialog,
    public afs: AngularFirestore) {
    this.idUser = route.snapshot.paramMap.get('id') as string;
    this.sings$ = singService.getSingInfo(this.idUser, this.date);

    this.sings2$ = singService.getSing2(this.idUser, this.date)
  }
  /*toModel(ngbDate: any): firebase.default.firestore.Timestamp {
    const start = new Date(1970, 1, 1, 0, 0, 0);
    const end = new Date(1970, 1, 1, 23, 59, 0);
    return firebase.default.firestore.Timestamp.fromDate(jsDate);
  }*/


  ngOnInit(): void {
    const start = new Date();
    start.setHours(0);
    start.setMinutes(0);
    const finish = new Date();
    finish.setHours(23);
    finish.setMinutes(59);
    const startDate = firebase.default.firestore.Timestamp.fromDate(start);
    const finishDate = firebase.default.firestore.Timestamp.fromDate(finish);

    this.schedulesList = [];
    this.singsList = [];
    this.enrollmentService.getEnrollmentsByUserId(this.idUser)
      .subscribe(enrollments => { // Me suscribo para obtener todos los enrollments de un usuario
        enrollments.forEach(enrollment => { // Recorro cada enrollment

          enrollment.subject?.subscribe(subject => { // Me suscribo para obtener los datos del subject de ese enrollment

            // Relleno los horarios
            // Me suscribo para obtener los enrollments (debería ser 1 solo) dado un usuario y subject
            this.enrollmentService.getEnrollmentsByIdUserSubjectId(this.idUser, enrollment.refSubject.id).subscribe(enrollments2 => {
              enrollments2.forEach(enrollment2 => { // para cada enrollment
                this.afs.collection('enrollments').doc(enrollment2.id) // Obtengo los sings del enrollment en un día determinado X
                  .collection<Sing>('sings', ref => ref.where('createdAt', '>', startDate).where('createdAt', '<', finishDate).orderBy('createdAt')).valueChanges()
                  .subscribe(sings => {
                    sings.forEach(sing => {
                      this.singsList.push({ createdAt: sing.createdAt, idSubject: enrollment.refSubject.id });
                      this.empareja();
                    });
                  });
              });
            });

            // Relleno los fichajes realizados
            this.afs.doc<Subject>(enrollment.refSubject.path)
              .collection<Schedule>('schedules', ref => ref.orderBy('startTime').where('dayOfWeek', '==', 3))
              .valueChanges().subscribe(schedules => { // Me suscribo para obtener los horarios (de un día de la semana X) de un subject determinado

                schedules.forEach(schedule => {
                  this.schedulesList.push({ name: subject.name, startTime: schedule.startTime,
                    finishTime: schedule.finishTime, idSubject: enrollment.refSubject.id, idEnrollment: enrollment.id as string });
                  this.schedulesList.sort((a, b) => a.startTime.toMillis() - b.startTime.toMillis());
                  this.empareja();
                });
              });

          });
        });
      });

    /*this.enrollmentService.getEnrollmentsByUserId(this.idUser)
      .subscribe(enrollments => {

        enrollments.forEach(enrollment => {
          this.gestEnrollent(enrollment);
        });

      });*/
  }

  empareja(): void {

  }
  getSingsEmparejados(start: Date, finish: Date, idSubject: string) {
    const retorno: InfoSingsData[] = [];
    const noPair: InfoSingsData[] = [];
    //this.noPair = []
    //console.log('emparejas:',idSubject);
    this.singsList.forEach(sing => {
      //console.log('sing:', sing.createdAt.toDate());
      //console.log('s',start)
      //console.log('f',finish)
      if (sing.idSubject === idSubject) {
        // start: 11:00   finish: 13:00
        // La fecha del sing esta dentro del rango strart y finish
        let m1 = moment(sing.createdAt.toMillis());
        m1.hours(start.getHours());
        m1.minutes(start.getMinutes());

        const m2 = moment(sing.createdAt.toMillis());
        m2.hours(finish.getHours());
        m2.minutes(finish.getMinutes());
       // console.log('m1',m1)
       // console.log('m2',m2)
        if (moment(sing.createdAt.toDate())
          .isBetween(m1, m2)) {
        //  console.log('coincice:', sing.createdAt.toDate());
          retorno.push(sing);
        }else{
          console.log('no coincice:', sing.createdAt.toDate());
          noPair.push(sing);
        }
      }
      //let m = moment(sing.createdAt.toDate());

    });
    //this.noPair$.complete();
    return {retorno, noPair};
  }
  /*gestEnrollent(enrollment: Enrollment): void {
    this.subjectService.getSubjectById(enrollment.refSubject.id)
      .subscribe(subject => {
        //console.log(subjects);
          this.subjectService.getSchedulesByIdSubject(enrollment.refSubject.id)
            .subscribe(schedules =>{
              schedules.forEach(schedule => {
                const info: InfoSchedule = {subject:subject, schedule: schedule }
                this.datos.push( info );
              })
            })
      });
  }*/

  getSings(startTime: firebase.default.firestore.Timestamp, finishTime: firebase.default.firestore.Timestamp) {

  }

  fromModel(ts: firebase.default.firestore.Timestamp): moment.Moment {
    return moment(ts.toDate());
  }

  openDialog(idEnrollment: string, date: Date): void {
    const dialogRef = this.dialog.open(EnrollmentJustificationsAddDialogComponent, {
      data: {
        idEnrollment,
        date
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
