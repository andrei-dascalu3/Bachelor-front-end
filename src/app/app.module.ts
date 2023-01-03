import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
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
import { UserListAltComponent } from './users/user-list-alt/user-list-alt.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthComponent } from './auth/auth.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { ThemeDetailComponent } from './proposals/theme-detail/theme-detail.component';
import { TopicDetailComponent } from './proposals/topic-detail/topic-detail.component';
import { ProposalEditComponent } from './proposals/proposal-edit/proposal-edit.component';

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
    UserListAltComponent,
    PreferencesComponent,
    AuthComponent,
    UserEditComponent,
    ProposalsComponent,
    ThemeDetailComponent,
    TopicDetailComponent,
    ProposalEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
