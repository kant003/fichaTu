import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { IpService } from 'src/app/services/ip.service';
import { UserService } from 'src/app/services/user.service';
import { ConfigurationService } from '../../services/configuration.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User>;
  groupToSing?: Group;
  pairDays?: number;

  constructor(
    public userService: UserService,
    public ipService: IpService,
    route: ActivatedRoute,
    private configurationService: ConfigurationService) {

    const uid = route.snapshot.paramMap.get('id') as string;

    this.user$ = userService.getUserById(uid);
  }

  ngOnInit(): void {
    this.configurationService.getConfigurationGroup()
      .subscribe(configurationGroup => {
        this.pairDays = configurationGroup.pairDays; // 0   1
        // 0 dias pares vienen el grupo A
        // 1 dias pares vienen el grupo B
      });
  }

  calcGroupToSing(): number {
    return this.pairDays === Group.A ? Group.A : Group.B;
  }

  now(): moment.Moment {
    return moment();
  }

  getDayOfYear(): number {
    return this.now().dayOfYear();
  }

  getParityOfDayYear(): string {
    return this.getDayOfYear() % 2 === 0 ? 'par' : 'impar';
  }
}
