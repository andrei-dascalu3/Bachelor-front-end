import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiPaths, environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Proposal } from '../proposals/proposal.model';

import { User } from '../users/user.model';
import { UserService } from '../users/user.service';
import { NewUser } from './newUser.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private userService: UserService, private authService: AuthService) {}

  fetchUsers() {
    const headerDict = {
      Authorization: 'Bearer ' + this.authService.currentToken
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    }
    return this.http
      .get<User[]>(
        `${this.baseUrl}/${ApiPaths.Users}`,
        requestOptions
      )
      .pipe(
        map((result) => {
          const users: User[] = result;
          return users;
        }),
        tap((users) => {
          this.userService.setUsers(users);
        })
      );
  }

  fetchProposals(uid: number) : Proposal[] {
    return []
  }

  addNewUser(newUser: NewUser) {
    const headerDict = {
      Authorization: 'Bearer ' + this.authService.currentToken,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
      body: newUser,
    };
    return this.http.post<NewUser>(
      `${this.baseUrl}/${ApiPaths.User}/save`,
      requestOptions
    );
  }
}
