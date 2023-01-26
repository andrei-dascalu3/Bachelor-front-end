import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, tap } from 'rxjs';
import {
  HandleError,
  HttpErrorHandler,
} from 'src/app/shared/services/http-error-handler.service';
import { ApiPaths, environment } from 'src/environments/environment';
import { Preference } from '../models/preference.model';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  baseUrl = environment.baseUrl;
  preferencesChanged = new Subject<Preference[]>();
  private preferences: Preference[] = [];
  private handleError: HandleError;
  private uid: number;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? userData.uid : null;
    this.handleError = httpErrorHandler.createHandleError('PreferenceService');
  }

  getPreferences() {
    return this.preferences.slice();
  }

  getPreference(index: number) {
    return this.preferences[index];
  }

  setPreferences(preferences: Preference[]) {
    this.preferences = preferences;
    this.preferencesChanged.next(this.preferences.slice());
  }

  studentHasProposal(studId: number, propId: number) {
    return this.http.get<boolean>(
      `${this.baseUrl}/${ApiPaths.Users}/${studId}/${ApiPaths.Preferences}/${propId}/exists`
    );
  }

  addUserPreference(propId: number) {
    const newPref = new Preference(this.uid, propId, 1);
    return this.http
      .post<Preference>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Preference}/save`,
        newPref
      )
      .pipe(
        catchError(this.handleError('addUserPreference', newPref)),
        tap((addedPreference) => {
          this.preferences.push(addedPreference);
          this.preferencesChanged.next(this.preferences.slice());
        })
      )
      .subscribe();
  }

  fetchUserPreferences() {
    return this.http
      .get<Preference[]>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Preferences}`
      )
      .pipe(
        catchError(this.handleError('fetchUserPreferences', [])),
        tap((preferences) => {
          this.setPreferences(preferences);
        })
      );
  }

  updateUserPreference(index: number, updatedPreference: Preference) {
    const propId = updatedPreference.proposalId;
    return this.http
      .put<Preference>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Preferences}/${propId}/update`,
        updatedPreference
      )
      .pipe(
        catchError(this.handleError('updateUserPreference', updatedPreference)),
        tap((updatedPreference) => {
          this.preferences[index] = updatedPreference;
          this.preferencesChanged.next(this.preferences.slice());
        })
      )
      .subscribe();
  }

  deleteUserPreference(index: number) {
    const propId = this.preferences[index].proposalId;
    return this.http
      .delete(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Preferences}/${propId}/delete`
      )
      .pipe(
        catchError(this.handleError('deleteUserProposal', propId)),
        tap(() => {
          this.preferences.splice(index, 1);
          this.preferencesChanged.next(this.preferences.slice());
        })
      )
      .subscribe();
  }
}
