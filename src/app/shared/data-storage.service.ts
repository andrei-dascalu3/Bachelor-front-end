import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiPaths, environment } from 'src/environments/environment';
import { Proposal } from '../proposals/proposal.model';

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
      Authorization: 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b20uZG91Z2xhc0BlbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9VU0VSIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGkvbG9naW4iLCJleHAiOjE2NzI3NTEwOTN9.xkTx9JC8Au1PECGZXMIapCNQsvm5jQVpEx6HP75064g'
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
}
