import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserEnrollmentSingComponent } from './components/user-enrollment-sing/user-enrollment-sing.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEnrollmentsEditComponent } from './components/user-enrollments-edit/user-enrollments-edit.component';
import { EnrollmentsOrderComponent } from './components/enrollments-order/enrollments-order.component';
import { SubjectScheduleComponent } from './components/subject-schedule/subject-schedule.component';
import { EnrollmentsSingsComponent } from './components/enrollments-sings/enrollments-sings.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SecurityTestComponent } from './components/security-test/security-test.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { SingsComponent } from './components/sings/sings.component';
import { pipe, Observable, UnaryFunction } from 'rxjs';
import { customClaims } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { User } from './models/user';
import { FirebaseApp } from '@angular/fire';
import { OperatorFunction } from 'rxjs/internal/types';
import { JustificationsComponent } from './components/justifications/justifications.component';
import { UserJustificationsService } from './services/user-justifications.service';
import { UserEnrollmentJustificationsComponent } from './components/user-enrollment-justifications/user-enrollment-justifications.component';

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
  map((user: firebase.User | null) => {
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
  { path: 'user/:id/sings', component: SingsComponent },
  { path: 'user/:id/enrollments-edit', component: UserEnrollmentsEditComponent },
  { path: 'user/:id/enrollment/:idEnrollment/sings', component: UserEnrollmentSingComponent },
  { path: 'user/:idUser/enrollment/:idEnrollment/justifications', component: UserEnrollmentJustificationsComponent },

  { path: 'subjects', component: SubjectsComponent },

  { path: 'subject/:id/order', component: EnrollmentsOrderComponent },
  { path: 'subject/:id/schedules', component: SubjectScheduleComponent },
  { path: 'subject/:id/sings', component: EnrollmentsSingsComponent },
  { path: 'configuration', component: ConfigurationComponent },

  { path: 'subject/:id/enrollments', component: EnrollmentsOrderComponent },
  { path: 'enrollment/:idEnrollment/justifications', component: JustificationsComponent },
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
