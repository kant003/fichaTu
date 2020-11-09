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
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectAddDialogComponent } from './components/subject-add-dialog/subject-add-dialog.component';
import { UserEnrollmentListDialogComponent } from './components/user-enrollment-list-dialog/user-enrollment-list-dialog.component';
import { UserEnrollmentsListComponent } from './components/user-enrollments-list/user-enrollments-list.component';
import { UserEnrollmentSingComponent } from './components/user-enrollment-sing/user-enrollment-sing.component';
import { UserEnrollmentsEditComponent } from './components/user-enrollments-edit/user-enrollments-edit.component';
import { EnrollmentsOrderComponent } from './components/enrollments-order/enrollments-order.component';
import { SubjectScheduleAddDialogComponent } from './components/subject-schedule-add-dialog/subject-schedule-add-dialog.component';
import { SubjectScheduleComponent } from './components/subject-schedule/subject-schedule.component';
import { EnrollmentsSingsComponent } from './components/enrollments-sings/enrollments-sings.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { GroupPipePipe } from './pipes/group-pipe.pipe';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SecurityTestComponent } from './components/security-test/security-test.component';
import { SingsComponent } from './components/sings/sings.component';
import { JustificationsComponent } from './components/justifications/justifications.component';
import { JustificationAddDialogComponent } from './components/justification-add-dialog/justification-add-dialog.component';
import { SubjectEnrollmentsComponent } from './components/subject-enrollments/subject-enrollments.component';
import { UserEnrollmentJustificationsComponent } from './components/user-enrollment-justifications/user-enrollment-justifications.component';
import { UserEnrollmentJustificationsAddDialogComponent } from './components/user-enrollment-justifications-add-dialog/user-enrollment-justifications-add-dialog.component';
import { JustificationFileDialogComponent } from './components/justification-file-dialog/justification-file-dialog.component';

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
    SubjectsComponent,
    SubjectAddDialogComponent,
    UserEnrollmentsEditComponent,
    UserEnrollmentSingComponent,
    UserEnrollmentsListComponent,
    UserEnrollmentListDialogComponent,
    EnrollmentsOrderComponent,
    SubjectScheduleComponent,
    SubjectScheduleAddDialogComponent,
    EnrollmentsSingsComponent,
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
    SingsComponent,
    JustificationsComponent,
    JustificationAddDialogComponent,
    SubjectEnrollmentsComponent,
    UserEnrollmentJustificationsComponent,
    UserEnrollmentJustificationsAddDialogComponent,
    JustificationFileDialogComponent,
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
