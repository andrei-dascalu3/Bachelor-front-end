import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthAdminGuard } from './auth/guards/auth-admin.guard';
import { AuthProfessorGuard } from './auth/guards/auth-professor.guard';
import { AuthStudentGuard } from './auth/guards/auth-student.guard';
import { AuthGuard } from './auth/guards/auth.guard';

import { MatchingDetailComponent } from './matchings/matching-detail/matching-detail.component';
import { MatchingStartComponent } from './matchings/matching-start/matching-start.component';
import { MatchingsComponent } from './matchings/matchings.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ProposalDetailComponent } from './proposals/proposal-detail/proposal-detail.component';
import { ProposalEditComponent } from './proposals/proposal-edit/proposal-edit.component';
import { ProposalResolverService } from './proposals/resolvers/proposal-resolver.service';
import { ProposalsStartComponent } from './proposals/proposals-start/proposals-start.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProfessorsResolverService } from './users/resolvers/professors-resolver.service';
import { StudentsResolverService } from './users/resolvers/students-resolver.service';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserStartComponent } from './users/user-start/user-start.component';
import { UsersComponent } from './users/users.component';
import { ProposalStudentResolverService } from './proposals/resolvers/proposal-student-resolver.service';
import { PreferenceStartComponent } from './preferences/preference-start/preference-start.component';
import { PreferenceResolverService } from './preferences/resolvers/preference-resolver.service';
import { PreferenceDetailComponent } from './preferences/preference-detail/preference-detail.component';
import { ProposalAssignResolverService } from './proposals/resolvers/proposal-assign-resolver.service';
import { AccordsComponent } from './accords/accords.component';
import { AccordStartComponent } from './accords/accord-start/accord-start.component';
import { AccordProfessorResolverService } from './accords/resolvers/accord-professor-resolver.service';
import { AccordDetailComponent } from './accords/accord-detail/accord-detail.component';
import { AccordStudentResolverService } from './accords/resolvers/accord-student-resolver.service';

const appRoutes: Routes = [
  {
    path: 'matchings',
    component: MatchingsComponent,
    children: [
      {
        path: '',
        component: MatchingStartComponent,
      },
      {
        path: ':id',
        component: MatchingDetailComponent,
      },
    ],
  },
  {
    path: 'students',
    component: UsersComponent,
    canActivate: [AuthGuard, AuthProfessorGuard],
    children: [
      {
        path: '',
        component: UserStartComponent,
        resolve: [StudentsResolverService],
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: [StudentsResolverService],
      },
    ],
  },
  {
    path: 'students/:id/assign',
    component: ProposalsComponent,
    canActivate: [AuthGuard, AuthProfessorGuard],
    children: [
      {
        path: '',
        component: ProposalsStartComponent,
        resolve: [ProposalAssignResolverService],
      },
      {
        path: ':index',
        component: ProposalDetailComponent,
      },
    ],
  },
  {
    path: 'professors',
    component: UsersComponent,
    canActivate: [AuthGuard, AuthStudentGuard],
    children: [
      {
        path: '',
        component: UserStartComponent,
        resolve: [ProfessorsResolverService],
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: [ProfessorsResolverService],
      },
    ],
  },
  {
    path: 'professors/:id/proposals',
    component: ProposalsComponent,
    canActivate: [AuthGuard, AuthStudentGuard],
    children: [
      {
        path: '',
        component: ProposalsStartComponent,
        resolve: [ProposalStudentResolverService],
      },
      {
        path: ':index',
        component: ProposalDetailComponent,
      },
    ],
  },
  {
    path: 'proposals',
    component: ProposalsComponent,
    canActivate: [AuthGuard, AuthProfessorGuard],
    children: [
      {
        path: '',
        component: ProposalsStartComponent,
        resolve: [ProposalResolverService],
      },
      { path: 'new', component: ProposalEditComponent },
      {
        path: ':index',
        component: ProposalDetailComponent,
        resolve: [ProposalResolverService],
      },
      {
        path: ':index/edit',
        component: ProposalEditComponent,
        resolve: [ProposalResolverService],
      },
    ],
  },
  {
    path: 'professor/accords',
    component: AccordsComponent,
    canActivate: [AuthGuard, AuthProfessorGuard],
    children: [
      {
        path: '',
        component: AccordStartComponent,
        resolve: [AccordProfessorResolverService],
      },
      {
        path: ':index',
        component: AccordDetailComponent,
        resolve: [AccordProfessorResolverService]
      }
    ],
  },
  {
    path: 'student/accords',
    component: AccordsComponent,
    canActivate: [AuthGuard, AuthStudentGuard],
    children: [
      {
        path: '',
        component: AccordStartComponent,
        resolve: [AccordStudentResolverService],
      },
      {
        path: ':index',
        component: AccordDetailComponent,
        resolve: [AccordStudentResolverService]
      }
    ],
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    canActivate: [AuthGuard, AuthStudentGuard],
    children: [
      {
        path: '',
        component: PreferenceStartComponent,
        resolve: [PreferenceResolverService],
      },
      {
        path: ':index',
        component: PreferenceDetailComponent,
        resolve: [PreferenceResolverService],
      },
    ],
  },
  {
    path: 'add-user',
    component: UserEditComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  { path: '', redirectTo: '/matchings', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
