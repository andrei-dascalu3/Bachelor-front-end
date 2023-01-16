import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { ApiPaths, environment } from 'src/environments/environment';
import { User } from '../users/user.model';
import { UserData } from './userData.model';

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  uid: string;
  roles: string;
  isProfessor: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  userData = new Subject<UserData>();
  currentUser: User;
  currentToken: string = '';

  constructor(
    private http: HttpClient,
  ) {}

  login(email: string, password: string) {
    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };
    let body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    return this.http
      .post<AuthResponseData>(
        `${this.baseUrl}/${ApiPaths.Login}`,
        body.toString(),
        options
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            email,
            resData.accessToken,
            resData.refreshToken,
            +resData.expiresIn,
            +resData.uid,
            JSON.parse(resData.roles),
            JSON.parse(resData.isProfessor)
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    uid: number,
    roles: string[],
    isProfessor: boolean
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const userData = new UserData(
      email,
      uid,
      roles,
      isProfessor,
      accessToken,
      refreshToken,
      expirationDate,
    );
    this.userData.next(userData);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error) {
      switch (errorRes.status) {
        case 403: {
          errorMessage = 'Incorrect email or password!';
          break;
        }
        default: {
          errorMessage = 'An unknown error occured.';
          break;
        }
      }
      return throwError(errorMessage);
    }
    return throwError(errorRes);
  }
}
