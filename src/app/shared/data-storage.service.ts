import { HttpClient } from '@angular/common/http';
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
    return this.http
      .get<{ _embedded: { users: User[] }; _links: {}; page: {} }>(
        `${this.baseUrl}/${ApiPaths.Users}`
      )
      .pipe(
        map((result) => {
          const users: User[] = result._embedded.users;
          return users;
        }),
        tap((users) => {
          this.userService.setUsers(users);
        })
      );
  }
}
