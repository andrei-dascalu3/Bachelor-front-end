import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import {
  HandleError,
  HttpErrorHandler,
} from 'src/app/shared/services/http-error-handler.service';
import { ApiPaths, environment } from 'src/environments/environment';
import { Matching } from '../models/matching.model';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {
  baseUrl = environment.baseUrl;
  matchingsChanged = new Subject<Matching[]>();
  private matchings: Matching[] = [];
  private handleError: HandleError;
  private uid: number;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? userData.uid : null;
    this.handleError = httpErrorHandler.createHandleError('MatchingService');
  }

  getMatchings() {
    return this.matchings.slice();
  }

  getMatching(index: number) {
    return this.matchings[index];
  }

  setMatchings(matchings: Matching[]) {
    this.matchings = matchings;
    this.matchingsChanged.next(this.matchings.slice());
  }

  fetchMatchings() {
    return this.http.get<Matching[]>(
      `${this.baseUrl}/${ApiPaths.Matchings}`
    )
    .pipe(
      catchError(this.handleError('fetchMatchings', [])),
        tap((matchings) => {
          this.setMatchings(matchings);
        })
    );
  }
}
