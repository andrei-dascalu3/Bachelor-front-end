import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap, take, exhaustMap } from 'rxjs/operators';
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

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthService
  ) {}

  fetchUser(uid: number) {
    return this.http.get<User>(`${this.baseUrl}/${ApiPaths.Users}/${uid}`).pipe(
      map((result) => {
        const user: User = result;
        return user;
      })
    );
  }

  fetchUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/${ApiPaths.Users}`).pipe(
      map((result) => {
        const users: User[] = result;
        return users;
      }),
      tap((users) => {
        this.userService.setUsers(users);
      })
    );
  }

  fetchProposals(uid: number): Proposal[] {
    return [];
  }

  addNewUser(newUser: NewUser) {
    return this.http
      .post<NewUser>(`${this.baseUrl}/${ApiPaths.User}/save`, newUser)
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occured!';
          if (!errorRes.error || !errorRes.error.errorMessage) {
            return throwError(() => new Error(errorMessage));
          }
          if (
            errorRes.error.errorMessage.startsWith(
              `Request processing failed; nested exception is org.springframework.dao.DataIntegrityViolationException: could not execute statement; SQL \[n/a\]; constraint \[user.username_UNIQUE\];`
            )
          ) {
            return throwError(() => Error(errorMessage));
          }
          return throwError(() => Error(errorMessage));
        })
      );
  }

  addRoleToUser(username: string, roleName: string) {
    const body = {
      username: username,
      roleName: roleName,
    };
    return this.http.post(`${this.baseUrl}/${ApiPaths.AddRole}`, body);
  }
}
