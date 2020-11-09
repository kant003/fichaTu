import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Enrollment } from 'src/app/models/enrollments';
import { Schedule } from 'src/app/models/schedule';
import { Subject } from 'src/app/models/subject';
import { EnrollmentService } from '../../services/enrollment.service';
import { SubjectService } from '../../services/subject.service';
import { SubjectsComponent } from '../subjects/subjects.component';
import { SingService } from '../../services/sing.service';
import { Observable } from 'rxjs';
import { InfoSchedule } from 'src/app/models/infoSchedules';



@Component({
  selector: 'app-sings',
  templateUrl: './sings.component.html',
  styleUrls: ['./sings.component.css']
})
export class SingsComponent implements OnInit {
  idUser: string;
  date = moment(new Date()) as moment.Moment;
  public sings$: Observable<InfoSchedule[]>;
  //public datos: InfoSchedule[] = [];
  constructor(private enrollmentService: EnrollmentService,
              private subjectService: SubjectService,
              private singService: SingService,
              route: ActivatedRoute) {
    this.idUser = route.snapshot.paramMap.get('id') as string;
    this.sings$ = singService.getSingInfo(this.idUser, this.date);
  }

  ngOnInit(): void {
    /*this.enrollmentService.getEnrollmentsByUserId(this.idUser)
      .subscribe(enrollments => {

        enrollments.forEach(enrollment => {
          this.gestEnrollent(enrollment);
        });

      });*/
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

}
