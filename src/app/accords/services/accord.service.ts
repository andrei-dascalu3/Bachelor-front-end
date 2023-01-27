import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import { Proposal } from 'src/app/proposals/models/proposal.model';
import {
  HandleError,
  HttpErrorHandler,
} from 'src/app/shared/services/http-error-handler.service';
import { User } from 'src/app/users/models/user.model';
import { ApiPaths, environment } from 'src/environments/environment';
import { Accord } from '../models/accord.model';

@Injectable({
  providedIn: 'root',
})
export class AccordService {
  baseUrl = environment.baseUrl;
  accordsChanged = new Subject<Accord[]>();
  hasAccordAccepted = false;
  private accords: Accord[] = [];
  private handleError: HandleError;
  private uid: number;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? userData.uid : null;
    this.handleError = httpErrorHandler.createHandleError('AccordService');
  }

  getAccords() {
    return this.accords.slice();
  }

  getAccord(index: number) {
    return this.accords[index];
  }

  setAccords(accords: Accord[]) {
    this.accords = accords;
    this.accordsChanged.next(this.accords.slice());
  }

  addAccord(studId: number, propId: number) {
    const newAccord = new Accord(this.uid, studId, propId);
    return this.http
      .post<Accord>(
        `${this.baseUrl}/${ApiPaths.Professors}/${this.uid}/${ApiPaths.Accord}/save`,
        newAccord
      )
      .pipe(
        catchError(this.handleError('addAccord', newAccord)),
        tap((addedAccord) => {
          this.accords.push(addedAccord);
          this.accordsChanged.next(this.accords.slice());
        })
      )
      .subscribe();
  }

  fetchStudentAccords() {
    return this.http
      .get<Accord[]>(
        `${this.baseUrl}/${ApiPaths.Students}/${this.uid}/${ApiPaths.Accords}`
      )
      .pipe(
        catchError(this.handleError('fetchStudentAccords', [])),
        tap((accords) => {
          this.setAccords(accords);
        })
      );
  }

  fetchProfessorAccords() {
    return this.http
      .get<Accord[]>(
        `${this.baseUrl}/${ApiPaths.Professors}/${this.uid}/${ApiPaths.Accords}`
      )
      .pipe(
        catchError(this.handleError('fetchProfessorAccords', [])),
        tap((accords) => {
          this.setAccords(accords);
        })
      );
  }

  updateAccord(index: number, updatedAccord: Accord) {
    const profId = updatedAccord.profId;
    return this.http
      .put<Accord>(
        `${this.baseUrl}/${ApiPaths.Students}/${this.uid}/${ApiPaths.Accords}/${profId}/update`,
        updatedAccord
      )
      .pipe(
        catchError(this.handleError('updateAccord', updatedAccord)),
        tap((updatedAccord) => {
          this.accords[index] = updatedAccord;
          this.accordsChanged.next(this.accords.slice());
        })
      )
      .subscribe();
  }

  deleteAccord(index: number) {
    const studId = this.accords[index].studId;
    return this.http
      .delete(
        `${this.baseUrl}/${ApiPaths.Professors}/${this.uid}/${ApiPaths.Accords}/${studId}/delete`
      )
      .pipe(
        catchError(this.handleError('deleteAccord', studId)),
        tap(() => {
          this.accords.splice(index, 1);
          this.accordsChanged.next(this.accords.slice());
        })
      )
      .subscribe();
  }

  accordsAcceptedByStudentExist(studId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('studId', studId);
    return this.http.get<boolean>(
      `${this.baseUrl}/${ApiPaths.Accords}/exists`,
      { params: queryParams }
    );
  }
}
