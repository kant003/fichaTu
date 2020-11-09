import { Injectable } from '@angular/core';
declare var webObject: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private gapi;

  constructor() {
    this.gapi = webObject.gapi();
   }

  edita(values: any, range: string): any {

    const body = {
      values
    };
    return this.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: '1vaHqhd5P37XflZzRm101eawERry50wrcW4cv4euDl3w',
        range,
        valueInputOption: 'USER_ENTERED',
        resource: body
      });
  }
}
