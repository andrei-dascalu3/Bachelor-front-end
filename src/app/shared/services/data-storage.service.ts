import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap, take, exhaustMap } from 'rxjs/operators';
import { ApiPaths, environment } from 'src/environments/environment';
import { Proposal } from '../../proposals/proposal.model';
import { ProposalService } from '../../proposals/proposal.service';

import { User } from '../../users/user.model';
import { UserService } from '../../users/user.service';
import { NewProposal } from '../models/newProposal.model';
import { NewUser } from '../models/newUser.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private proposalService: ProposalService
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

  fetchProfessors() {
    return this.http.get<User[]>(`${this.baseUrl}/${ApiPaths.Professors}`).pipe(
      map((result) => {
        const professors: User[] = result;
        return professors;
      }),
      tap((professors) => {
        this.userService.setUsers(professors);
      })
    );
  }

  fetchStudents() {
    return this.http.get<User[]>(`${this.baseUrl}/${ApiPaths.Students}`).pipe(
      map((result) => {
        const students: User[] = result;
        return students;
      }),
      tap((students) => {
        this.userService.setUsers(students);
      })
    );
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

  fetchAllProposals() {
    return this.http
      .get<Proposal[]>(`${this.baseUrl}/${ApiPaths.Proposals}`)
      .pipe(
        map((result) => {
          const proposals: Proposal[] = result;
          return proposals;
        }),
        tap((proposals) => {
          this.proposalService.setProposals(proposals);
        })
      );
  }

  fetchUserProposals(uid: number) {
    return this.http
      .get<Proposal[]>(
        `${this.baseUrl}/${ApiPaths.Users}/${uid}/${ApiPaths.Proposals}`
      )
      .pipe(
        map((result) => {
          const proposals: Proposal[] = result;
          return proposals;
        }),
        tap((proposals) => {
          this.proposalService.setProposals(proposals);
        })
      );
  }

  addNewProposal(uid: number, newProposal: NewProposal) {
    return this.http
      .post<NewUser>(
        `${this.baseUrl}/${ApiPaths.Users}/${uid}/${ApiPaths.Proposals}/save`,
        newProposal
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occured at adding proposal!';
          if (!errorRes.error || !errorRes.error.errorMessage) {
            return throwError(() => new Error(errorMessage));
          }
          return throwError(() => Error(errorMessage));
        })
      );
  }

  updateProposal(uid: number, propId: number, updatedProposal: NewProposal) {
    return this.http
      .put<NewUser>(
        `${this.baseUrl}/${ApiPaths.Users}/${uid}/${ApiPaths.Proposals}/${propId}/update`,
        updatedProposal
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occured at updating proposal!';
          if (!errorRes.error || !errorRes.error.errorMessage) {
            return throwError(() => new Error(errorMessage));
          }
          return throwError(() => Error(errorMessage));
        })
      );
  }
}
