import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EnrollmentSingsComponent } from './components/enrollment-sings/enrollment-sings.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEnrollmentsEditComponent } from './components/user-enrollments-edit/user-enrollments-edit.component';
import { SubjectOrderComponent } from './components/subject-order/subject-order.component';
import { SubjectSchedulesComponent } from './components/subject-schedules/subject-schedules.component';
import { SubjectSingsComponent } from './components/subject-sings/subject-sings.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SecurityTestComponent } from './components/security-test/security-test.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { UserSingsComponent } from './components/user-sings/user-sings.component';
import { pipe, Observable, UnaryFunction } from 'rxjs';
import { customClaims } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { FirebaseApp } from '@angular/fire';
import { OperatorFunction } from 'rxjs/internal/types';
// import { JustificationsComponent } from './components/justifications/justifications.component';
import { UserJustificationsService } from './services/user-justifications.service';
import { EnrollmentJustificationsComponent } from './components/enrollment-justifications/enrollment-justifications.component';
import { EnrollmentCalificationsComponent } from './components/enrollment-califications/enrollment-califications.component';
import { SubjectCalificationsComponent } from './components/subject-califications/subject-califications.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const teacherOnly = () => pipe(
  customClaims as any,
  map((claims: User) => claims.isTeacher === true)
);
// const teacherOnly2 = (next) => map( (user:User) => !!user && next.params.userId === user.uid);
const teacher = (u: User) => u.isTeacher;
const adminOnly = () => hasCustomClaim('admin');
// const editorOnly = () => pipe(customClaims, map( (claims: firebase.User | User) => claims.isTeacher === true));
const belongsToAccount = (next: any) => hasCustomClaim(`isTeacher`);
const editorOnly = (): any => pipe(customClaims,
  map( (claims) => claims['isTeacher'] === true )
);


const redirectToProfileEditOrLogin = () =>
  map((user: firebase.default.User | null) => {
    if (!user?.isAnonymous) { return ['users']; }
    else { return ['login']; }
  });
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'acercade', component: AcercadeComponent },
  // {path: 'prueba', component: PruebaComponent },
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'user/:id/sings', component: UserSingsComponent },
  { path: 'user/:id/enrollments-edit', component: UserEnrollmentsEditComponent },
  { path: 'user/:id/enrollment/:idEnrollment/sings', component: EnrollmentSingsComponent },

  { path: 'user/:idUser/enrollment/:idEnrollment/justifications', component: EnrollmentJustificationsComponent },

  { path: 'subjects', component: SubjectListComponent },

  { path: 'subject/:id/order', component: SubjectOrderComponent },
  { path: 'subject/:id/schedules', component: SubjectSchedulesComponent },
  { path: 'subject/:id/sings', component: SubjectSingsComponent },
  { path: 'subject/:id/califications', component: SubjectCalificationsComponent },
  { path: 'configuration', component: ConfigurationComponent },

  { path: 'subject/:id/enrollments', component: SubjectOrderComponent },
  /// { path: 'enrollment/:idEnrollment/justifications', component: JustificationsComponent },
  { path: 'enrollment/:idEnrollment/califications', component: EnrollmentCalificationsComponent },
  { path: 'user/:id/enrollment/:idEnrollment/justifications', component: UserJustificationsService },


  { path: 'prueba', component: PruebaComponent },
  { path: 'securityTest', component: SecurityTestComponent },
  { path: '**', component: PageNotFoundComponent }

  /*{ path: 'user/:id', component: UserDetailComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'enrollments-edit', component: UserEnrollmentsEditComponent },
      { path: 'enrollment/:idEnrollment',
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'sings', component: UserEnrollmentSingComponent },
          ]
      },
    ]
  },*/
  // {path: 'enrollments', component: EnrollmentsComponent},

  //{path: 'subjects', component: SubjectsComponent},
  //{ path: 'subject/:id',
  //  children: [
  //    { path: '', redirectTo: 'overview', pathMatch: 'full' },
  //    { path: 'order', component: EnrollmentsOrderComponent },
  //    { path: 'sings', component: EnrollmentsSingsComponent },
  //    { path: 'schedules', component: SubjectScheduleComponent }
  //  ]
  // },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
