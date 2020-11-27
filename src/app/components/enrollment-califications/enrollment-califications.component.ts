
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Calification } from 'src/app/models/calification';
import { CalificationService } from 'src/app/services/calification.service';

@Component({
  selector: 'app-enrollment-califications',
  templateUrl: './enrollment-califications.component.html',
  styleUrls: ['./enrollment-califications.component.scss']
})
export class EnrollmentCalificationsComponent implements OnInit {
  califications$: Observable<Calification[]>;

  constructor(
    public calificationService: CalificationService,
    route: ActivatedRoute,
  ) {
    const idEnrollment = route.snapshot.paramMap.get('idEnrollment') as string;
    this.califications$ = calificationService.getCalificationsByIdEnrollmentOrderByCreatedAt(idEnrollment);
  }

  ngOnInit(): void {
  }

  getColor(value: number | null): string {
    if (value === null) {
      return 'gray';
    } else {
      return value < 5 ? 'red' : 'blue';
    }
  }
}
