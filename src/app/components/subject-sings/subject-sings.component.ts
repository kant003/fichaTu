import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enrollment } from 'src/app/models/enrollments';
import { Subject } from 'src/app/models/subject';
import { Sing } from 'src/app/models/sing';

import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSliderChange } from '@angular/material/slider';
import { IpService } from 'src/app/services/ip.service';
import { Group } from 'src/app/models/group';
import { SnackBarService } from '../../services/snack-bar.service';
import { GoogleApiService } from 'src/app/services/google-api.service';
import { ConfigurationService } from '../../services/configuration.service';
import * as moment from 'moment';


@Component({
  selector: 'app-subject-sings',
  templateUrl: './subject-sings.component.html',
  styleUrls: ['./subject-sings.component.css']
})
export class SubjectSingsComponent implements OnInit {

  idSubject: string;
  subject$: Observable<Subject>;

  timeFilter$: BehaviorSubject<number>;

  enrollments$!: Observable<Enrollment[]>;

  public datos = [] as Array<string[]>;

  public dict: Map<number, string> = new Map();

  showTicks = true;
  autoTicks = false;
  tickInterval = 1;

  groupToSing?: Group;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }
    return 0;
  }

  constructor(
    private afs: AngularFirestore, private router: Router,
    private route: ActivatedRoute, private googleApi: GoogleApiService,
    private snackBarService: SnackBarService, public ipService: IpService,
    private configurationService: ConfigurationService) {

    this.idSubject = route.snapshot.paramMap.get('id') as string;
    this.timeFilter$ = new BehaviorSubject(0);

    this.subject$ = this.afs.collection<Subject>('subjects').doc<Subject>(this.idSubject).valueChanges() as Observable<Subject>;
  }

  ngOnInit(): void {
    this.timeFilter$.subscribe(minutes => {
      if (!minutes) { return; }
      this.enrollments$ = this.getEnrollmentsOfSubject(minutes);
      this.enrollments$.subscribe(e => {

        this.prepareDataToSend(minutes);
      });
    });

    this.timeFilter$.next(4);
    this.calcGroupToSing();
  }

  getEnrollmentsOfSubject(minutes: number): Observable<Enrollment[]> {
    const queryReferenceSubject = this.afs.collection('subjects').doc(this.idSubject).ref;

    return this.afs.collection<Enrollment>('enrollments', ref => ref.orderBy('pos').where('refSubject', '==', queryReferenceSubject))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Enrollment;
            const id = a.payload.doc.id;
            const user = this.afs.doc(data.refUser.path).valueChanges() as Observable<User>;
            const subject = this.afs.doc(data.refSubject.path).valueChanges() as Observable<Subject>;

            const tiempoAtras = new Date();
            tiempoAtras.setMinutes(tiempoAtras.getMinutes() - minutes);
            const sings = this.afs.collection<Enrollment>('enrollments')
              .doc(id).collection<Sing>('sings', ref => ref.orderBy('createdAt').where('createdAt', '>=', tiempoAtras).limitToLast(1))
              .valueChanges();

            return { id, ...data, user, subject, sings };
          });
        })
      );
  }

  prepareDataToSend(minutes: number): void {
    this.datos = [];
    this.dict.clear();
    this.enrollments$.subscribe(enrollments => {
      enrollments.forEach(e => {
        const tiempoAtras = new Date();
        tiempoAtras.setMinutes(tiempoAtras.getMinutes() - minutes);

        this.afs.collection<Enrollment>('enrollments')
          .doc(e.id).collection<Sing>('sings', ref => ref.orderBy('createdAt').where('createdAt', '>=', tiempoAtras).limitToLast(1))
          .valueChanges().subscribe(s => {
            this.dict.set(e.pos, s.length > 0 ? 'Asis' : 'Fal');

          });

      });

    });

  }


  sendDatosToGoogleSheet(): void {
    const range = 'Hoja 1!A1:D' + this.datos.length;
    this.googleApi.edita(this.datos, range).then(
      (response: any) => {
        const result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
        this.snackBarService.info('Los datos han sido correctamente escritos en la hoja de calculo', 'Cerrar');
      }, (error: any) => {
        this.snackBarService.error('Error:' + error.result.error.message, 'Cerrar');
      });
  }


  changeIntervalSlider(event: MatSliderChange): void {
    this.timeFilter$.next(event.value as number);
  }

  /*edita() {
    let values = [
      [
        "Hola", "adios"
      ],
      // Additional rows ...
    ];
    let range = 'Hoja 1!A1:B1'
    this.googleApi.edita(values, range).then((response) => {
      const result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
    });
  }*/

  now(): moment.Moment {
    return moment();
  }
  getDayOfYear(): number {
    return this.now().dayOfYear();
  }

  calcGroupToSing(): void {
    this.configurationService.getConfigurationGroup().subscribe(conf => {
      const grupoEnDiasPares = conf.pairDays;
      if (grupoEnDiasPares === Group.A) { // GroupA
        this.groupToSing = (this.getDayOfYear() % 2 === 0) ? Group.B : Group.A;
      } else { // GroupB
        this.groupToSing = (this.getDayOfYear() % 2 === 0) ? Group.A : Group.B;
      }
    });
  }
  isCorrectSingLocalized(groupToSing: Group | undefined, group: number | undefined, inCenter: boolean): boolean | undefined {

    if (groupToSing === 0) {// group A in house, B in center
      if (group === 0 && inCenter === false) { return true; }
      if (group === 0 && inCenter === true) { return false; }
      if (group === 1 && inCenter === true) { return true; }
      if (group === 1 && inCenter === false) { return false; }
    } else if (groupToSing === 1) { // group B in house, A in house
      if (group === 0 && inCenter === false) { return false; }
      if (group === 0 && inCenter === true) { return true; }
      if (group === 1 && inCenter === true) { return false; }
      if (group === 1 && inCenter === false) { return true; }
    } else {
      console.log('error');
      return undefined;
    }
    return undefined;

  }

  getGroupColor(group: Group | undefined): string {
    switch (group) {
      case Group.A: return 'blue';
      case Group.B: return 'green';
      default: return 'red';
    }
  }

  onCopyToClipboardOnlyFoulsColumn(): void {
    const keyMax = Math.max(...this.dict.keys());
    let info2 = '';
    for (let i = 1; i <= keyMax; i++) {
      if (!this.dict.has(i)) {
        this.dict.set(i, 'vacio');
        console.log('meto:', i);
      }
    }
    const keys = [...this.dict.keys()];
    const sortedKeys = keys.sort((a, b) => a - b);
    sortedKeys.forEach((key) => {
      info2 += this.dict.get(key) + '\n';
    });

    this.copyTextToClipboard(info2);
  }

  /*
  onCopyToClipboard(): void {
    let info = '';
    let cont = 1;

    this.datos.forEach(row => {
      const dist = parseInt(row[0], 10) - cont;
      // console.log(row[0], dist);
      if (dist >= 2) {
        // console.log('si');
        for (let i = 1; i < dist; i++) {
          info += 'vacio' + '\t';
          info += '\n';
        }
      }
      cont = parseInt(row[0], 10);

      row.forEach(col => {
        info += col + '\t';
      });
      info += '\n';

    });
    // console.log(info)
    this.copyTextToClipboard(info);
  }*/

  copyTextToClipboard(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    // this.copy = true;
    setTimeout(() => {
      // this.copy = false;
      this.snackBarService.info('Datos copiados al portapapeles', 'Cerrar');
    }, 2000);
  }
}
