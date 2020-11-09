import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ip } from '../models/ip';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  ip: string;
  constructor(private http$: HttpClient) {
    this.ip = '-';
    this.getClientIpWeb1().subscribe(
      datos => this.ip = datos.ip,
      error1 => this.getClientIpWeb2().subscribe(
          datos => {this.ip = datos.ip; console.log('ip cargada')},
          error2 => console.log('fallo al cargar la ip' + error2)
        )
    );
  }


  getClientIpWeb2(): Observable<Ip> {
    return this.http$.get<Ip>('http://ipinfo.io');
  }

  getClientIpWeb1(): Observable<Ip> {
    return this.http$.get<Ip>('https://api.ipify.org/?format=json')
  }

}
