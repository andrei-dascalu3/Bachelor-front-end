import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserItemComponent } from './users/user-list/user-item/user-item.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { MatchingsComponent } from './matchings/matchings.component';
import { MatchingStartComponent } from './matchings/matching-start/matching-start.component';
import { MatchingDetailComponent } from './matchings/matching-detail/matching-detail.component';
import { UserStartComponent } from './users/user-start/user-start.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MatchingListComponent } from './matchings/matching-list/matching-list.component';
import { MatchingItemComponent } from './matchings/matching-list/matching-item/matching-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthComponent } from './auth/auth.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ProposalEditComponent } from './proposals/proposal-edit/proposal-edit.component';
import { ProposalDetailComponent } from './proposals/proposal-detail/proposal-detail.component';
import { ProposalListComponent } from './proposals/proposal-list/proposal-list.component';
import { ProposalsStartComponent } from './proposals/proposals-start/proposals-start.component';
import { ProposalItemComponent } from './proposals/proposal-list/proposal-item/proposal-item.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PreferenceListComponent } from './preferences/preference-list/preference-list.component';
import { PreferenceItemComponent } from './preferences/preference-list/preference-item/preference-item.component';
import { PreferenceDetailComponent } from './preferences/preference-detail/preference-detail.component';
import { PreferenceStartComponent } from './preferences/preference-start/preference-start.component';
import { AccordsComponent } from './accords/accords.component';
import { AccordListComponent } from './accords/accord-list/accord-list.component';
import { AccordItemComponent } from './accords/accord-list/accord-item/accord-item.component';
import { AccordStartComponent } from './accords/accord-start/accord-start.component';
import { AccordDetailComponent } from './accords/accord-detail/accord-detail.component';
import { SearchUserFilterPipe } from './users/pipes/search-user-filter.pipe';
import { SearchProposalFilterPipe } from './proposals/pipes/search-proposal-filter.pipe';
import { SearchPreferenceFilterPipe } from './preferences/pipes/search-preference-filter.pipe';
import { SearchAccordFilterPipe } from './accords/pipes/search-accord-filter.pipe';
import { SearchMatchingFilterPipe } from './matchings/pipes/search-matching-filter.pipe';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UsersComponent,
    UserListComponent,
    UserItemComponent,
    UserDetailComponent,
    MatchingsComponent,
    MatchingStartComponent,
    MatchingDetailComponent,
    UserStartComponent,
    LoadingSpinnerComponent,
    MatchingListComponent,
    MatchingItemComponent,
    PreferencesComponent,
    AuthComponent,
    UserEditComponent,
    ProposalsComponent,
    ProposalListComponent,
    ProposalEditComponent,
    ProposalDetailComponent,
    ProposalsStartComponent,
    ProposalItemComponent,
    PreferenceListComponent,
    PreferenceItemComponent,
    PreferenceDetailComponent,
    PreferenceStartComponent,
    AccordsComponent,
    AccordListComponent,
    AccordItemComponent,
    AccordStartComponent,
    AccordDetailComponent,
    SearchUserFilterPipe,
    SearchProposalFilterPipe,
    SearchPreferenceFilterPipe,
    SearchAccordFilterPipe,
    SearchMatchingFilterPipe,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
