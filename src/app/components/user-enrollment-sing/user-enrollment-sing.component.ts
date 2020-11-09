import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Sing } from 'src/app/models/sing';
import { EnrollmentService } from '../../services/enrollment.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import * as moment from 'moment';
import { Subject } from '../../models/subject';
import { SubjectService } from '../../services/subject.service';
import { Enrollment } from 'src/app/models/enrollments';
import { map } from 'rxjs/operators';
import { Schedule } from 'src/app/models/schedule';
import { SingService } from '../../services/sing.service';

@Component({
  selector: 'app-user-enrollment-sing',
  templateUrl: './user-enrollment-sing.component.html',
  styleUrls: ['./user-enrollment-sing.component.css'],
})
export class UserEnrollmentSingComponent implements OnInit {
  @Input() idAlumno: string;
  @Input() idEnrollment: string;
  state$!: Observable<object>;
  //@Input() state!: string;
  sings$: Observable<Sing[]>;

  singsDict = new Map();
  days = new Set();
  months = new Set();
  years = new Set();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  schedulesMonday: Schedule[] = [];
  schedulesTuesday: Schedule[] = [];
  constructor(
    private enrollmentService: EnrollmentService,
    private singService: SingService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.idAlumno = route.snapshot.paramMap.get('id') as string;
    this.idEnrollment = route.snapshot.paramMap.get('idEnrollment') as string;
    this.sings$ = this.singService.getSingsByIdEnrollment(this.idEnrollment);


  }

  ngOnInit(): void {
    this.enrollmentService.getSchedulersByidEnrollment(this.idEnrollment)
      .subscribe(schedules => {
        console.log(schedules);
        // Repartimos en 7 arrays (dias semana) cada horario
        schedules.forEach(schedule => {
          switch (schedule.dayOfWeek) {
            case 0: this.schedulesMonday.push(schedule); break;
            case 1: this.schedulesTuesday.push(schedule); break;
          }
        });



      });
// sm = [ s1, s3 ]
// st = [ s2 ]



    this.range = this.formBuilder.group({
      start: [moment().add(-7, 'days')],
      end: [moment()]
    });

    this.sings$.subscribe(sings => {
      this.singsDict.clear();
      sings.forEach(sing => {
        const date = moment(sing.createdAt.toDate()) as moment.Moment;
        const day = date.date();

        if (this.singsDict.has(day)) {
          const v = this.singsDict.get(day);
          v.push(date);
          this.singsDict.set(day, v);
          // console.log('tiene', this.singsDict);
        } else {
          const v = [];
          v.push(date);
          this.singsDict.set(day, v);
          // console.log('nuevo', this.singsDict);
        }
      });

    });

  }

  getDaysBetweenDates(): moment.Moment[] {
    const listaFechas = [];
    const start = moment(this.range.value.start) as moment.Moment;
    let nextDay = moment(start);
    const end = moment(this.range.value.end) as moment.Moment;
    const days = end.diff(start, 'days');

    for (let i = 0; i <= days; i++) {
      listaFechas.push(nextDay);
      nextDay = moment(start.add(1, 'days'));
    }

    return listaFechas;
  }

  getDayOfWeekColor(date: moment.Moment): string {
    return (date.day() === 0 || date.day() === 6) ? '#C0C0C0' : '#000000';
  }
}
