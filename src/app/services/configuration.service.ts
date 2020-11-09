import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConfigurationGroup } from '../models/configurationGroup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private afs: AngularFirestore) { }

  getConfigurationGroup(): Observable<ConfigurationGroup>{
    return this.afs.collection('configurations').doc<ConfigurationGroup>('group').valueChanges() as Observable<ConfigurationGroup>;
  }

  setGroupToPairDays(group: string): Promise<void>{
    const data = {pairDays: group};
    return this.afs.collection('configurations').doc('group').update(data);
  }
}
