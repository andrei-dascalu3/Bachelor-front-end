import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiPaths, environment } from 'src/environments/environment';

import { User } from '../users/user.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  fetchUsers() {
    const headerDict = {
      Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huLnNtaXRoQGVtYWlsLmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvZ2luIiwiZXhwIjoxNjcyNzM3ODczfQ.dVqO3mroIR8ekx38atwd2FuDOKFaTppkSOqOBy9roPw'
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
}
