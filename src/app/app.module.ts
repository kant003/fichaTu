import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatSliderModule } from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AsistioPipePipe } from './pipes/asistio-pipe.pipe';
import { BooleanoPipePipe } from './pipes/booleano-pipe.pipe';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { UserListComponent } from './components/user-list/user-list.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SubjectAddDialogComponent } from './components/subject-add-dialog/subject-add-dialog.component';
import { UserEnrollmentSelectDialogComponent } from './components/user-enrollment-select-dialog/user-enrollment-select-dialog.component';
import { UserEnrollmentsComponent } from './components/user-enrollments/user-enrollments.component';
import { EnrollmentSingsComponent } from './components/enrollment-sings/enrollment-sings.component';
import { UserEnrollmentsEditComponent } from './components/user-enrollments-edit/user-enrollments-edit.component';
import { SubjectOrderComponent } from './components/subject-order/subject-order.component';
import { SubjectScheduleAddDialogComponent } from './components/subject-schedule-add-dialog/subject-schedule-add-dialog.component';
import { SubjectSchedulesComponent } from './components/subject-schedules/subject-schedules.component';
import { SubjectSingsComponent } from './components/subject-sings/subject-sings.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { GroupPipePipe } from './pipes/group-pipe.pipe';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SecurityTestComponent } from './components/security-test/security-test.component';
import { UserSingsComponent } from './components/user-sings/user-sings.component';
//import { JustificationsComponent } from './components/justifications/justifications.component';
//import { JustificationAddDialogComponent } from './components/justification-add-dialog/justification-add-dialog.component';
import { EnrollmentJustificationsComponent } from './components/enrollment-justifications/enrollment-justifications.component';
import { EnrollmentJustificationsAddDialogComponent } from './components/enrollment-justifications-add-dialog/enrollment-justifications-add-dialog.component';
import { EnrollmentJustificationShowFileComponent } from './components/enrollment-justification-show-file/enrollment-justification-show-file.component';
import { EnrollmentCalificationsComponent } from './components/enrollment-califications/enrollment-califications.component';
import { SubjectCalificationsComponent } from './components/subject-califications/subject-califications.component';
import { UserEnrollmentCalificationsComponent } from './components/user-enrollment-califications/user-enrollment-califications.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    MenuComponent,
    AsistioPipePipe,
    BooleanoPipePipe,
    GroupPipePipe,
    UserListComponent,
    SubjectListComponent,
    SubjectAddDialogComponent,
    UserEnrollmentsEditComponent,
    EnrollmentSingsComponent,
    UserEnrollmentsComponent,
    UserEnrollmentSelectDialogComponent,
    SubjectOrderComponent,
    SubjectSchedulesComponent,
    SubjectScheduleAddDialogComponent,
    SubjectSingsComponent,
    AcercadeComponent,
    ConfigurationComponent,
    /*
    EnrollmentsComponent,
    AlumnosListComponent,
    PruebaComponent,
    */
    UserDetailComponent,
    ConfigurationComponent,
    PruebaComponent,
    SecurityTestComponent,
    UserSingsComponent,
    //JustificationsComponent,
    //JustificationAddDialogComponent,
    EnrollmentJustificationsComponent,
    EnrollmentJustificationsAddDialogComponent,
    EnrollmentJustificationShowFileComponent,
    EnrollmentCalificationsComponent,
    SubjectCalificationsComponent,
    UserEnrollmentCalificationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, // para uso de formulario
    ReactiveFormsModule, // para validacion formulario
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatSliderModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
