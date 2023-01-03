import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { MatchingDetailComponent } from './matchings/matching-detail/matching-detail.component';
import { MatchingStartComponent } from './matchings/matching-start/matching-start.component';
import { MatchingsComponent } from './matchings/matchings.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ProposalDetailComponent } from './proposals/proposal-detail/proposal-detail.component';
import { ProposalEditComponent } from './proposals/proposal-edit/proposal-edit.component';
import { ProposalResolverService } from './proposals/proposal-resolver.service';
import { ProposalsStartComponent } from './proposals/proposals-start/proposals-start.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserStartComponent } from './users/user-start/user-start.component';
import { UsersResolverService } from './users/users-resolver.service';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/matchings', pathMatch: 'full' },
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
    children: [
      {
        path: '',
        component: UserStartComponent,
        resolve: [UsersResolverService],
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: [UsersResolverService],
      },
    ],
  },
  {
    path: 'professors',
    component: UsersComponent,
    children: [
      { path: '', component: UserStartComponent },
      {
        path: ':id',
        component: UserDetailComponent,
      },
    ],
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
  },
  {
    path: 'proposals',
    component: ProposalsComponent,
    children: [
      { path: '', component: ProposalsStartComponent },
      { path: 'new', component: ProposalEditComponent },
      {
        path: ':id',
        component: ProposalDetailComponent,
        resolve: [ProposalResolverService]
      },
      {
        path: ':id/edit',
        component: ProposalEditComponent,
        resolve: [ProposalResolverService]
      }
    ]
  },
  {
    path: 'add-user',
    component: UserEditComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
