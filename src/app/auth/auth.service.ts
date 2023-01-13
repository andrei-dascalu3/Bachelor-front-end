import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  currentUser: User;
  currentToken: string;

  constructor(private http: HttpClient) {}

  addNewUser(newUser: User) {
    const headerDict = {
      Authorization: 'Bearer ' + this.currentToken,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
      body: newUser,
    };
    return this.http.post<User>(
      `${this.baseUrl}/${ApiPaths.User}/save`,
      requestOptions
    );
  }
}
