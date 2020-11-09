import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
  user$: Observable<User>;
  constructor(userService: UserService,route: ActivatedRoute,) {
    const idAlumno = route.snapshot.paramMap.get('id') as string;

    this.user$ = userService.getUserById('bVM7mXaZc8gWqjsRtRxtpNSsgzJ2');
  }

  ngOnInit(): void {

  }

}
