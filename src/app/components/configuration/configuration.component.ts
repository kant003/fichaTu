import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/group';
import { ConfigurationService } from '../../services/configuration.service';
import { ConfigurationGroup } from '../../models/configurationGroup';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatSelectChange } from '@angular/material/select';
declare var webObject: any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  configuration$: Observable<ConfigurationGroup>;
  gapi

  group!: Group;

  constructor(
    private configurationService: ConfigurationService,
    private snackBarService: SnackBarService) {
    this.gapi = webObject.gapi();
    this.configuration$ = configurationService.getConfigurationGroup();
  }

  ngOnInit(): void {
  }


  changeGroupToPairDays(event: MatSelectChange): void {
    console.log(event.value)
    // const group = (value === '0') ? Group.A : Group.B;
    this.configurationService.setGroupToPairDays(event.value).then(
      () => this.snackBarService.info(`Grupo  cambiado correctamente`, 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }

  /*changeGroupToPairDays(event: MatSelectChange, uid: string): void {
    let group = event.value, 10);
    if (!group) { group = Group.A; }

    this.configurationService.setGroupToPairDays(group).then(
      () => this.snackBarService.info(`Alumno cambiado al grupo ${group === 0 ? 'A' : 'B'} correctamente`, 'Cerrar'),
      error => this.snackBarService.error('Error:' + error, 'Cerrar')
    );
  }*/
  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event: Event) {
    this.gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event: Event) {
    this.gapi.auth2.getAuthInstance().signOut();
  }

  /**
   * Print the names and majors of students in a sample spreadsheet:
   * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
   */
  listMajors() {
    this.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '1vaHqhd5P37XflZzRm101eawERry50wrcW4cv4euDl3w',
      range: 'Hoja 1!A1:B4',
    }).then((response: any) => {
      const range = response.result;
      if (range.values.length > 0) {
        // appendPre('Name, Major:');
        for(let i = 0; i < range.values.length; i++) {
          const row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          // appendPre(row[0] + ', ' + row[4]);
        }
      } else {
        // appendPre('No data found.');
      }
    }, (response: any) => {
      // appendPre('Error: ' + response.result.error.message);
    });
  }


  edita() {

    const values = [
      [
        "Hola", "adios"
      ],
      // Additional rows ...
    ];
    const body = {
      values: values
    };
    const valueInputOption =
      this.gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: '1vaHqhd5P37XflZzRm101eawERry50wrcW4cv4euDl3w',
        range: 'Hoja 1!A1:B1',
        valueInputOption: "USER_ENTERED",
        resource: body
      }).then((response: any) => {
        const result = response.result;
        console.log(`${result.updatedCells} cells updated.`);
      });
  }
}
