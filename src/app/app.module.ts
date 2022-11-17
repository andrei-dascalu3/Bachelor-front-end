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
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
