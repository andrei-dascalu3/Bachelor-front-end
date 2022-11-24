import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchingDetailComponent } from './matchings/matching-detail/matching-detail.component';
import { MatchingStartComponent } from './matchings/matching-start/matching-start.component';
import { MatchingsComponent } from './matchings/matchings.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
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
      { path: '', component: UserStartComponent, resolve: [UsersResolverService] },
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
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
