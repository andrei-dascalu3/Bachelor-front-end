import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';
import {
  HandleError,
  HttpErrorHandler,
} from '../../shared/services/http-error-handler.service';
import { Proposal } from '../models/proposal.model';
import { catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  baseUrl = environment.baseUrl;
  proposalsChanged = new Subject<Proposal[]>();
  private proposals: Proposal[] = [];
  private handleError: HandleError;
  private uid: number;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler
  ) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? userData.uid : null;
    this.handleError = httpErrorHandler.createHandleError('ProposalService');
  }

  getProposals() {
    return this.proposals.slice();
  }

  getProposal(index: number) {
    return this.proposals[index];
  }

  setProposals(proposals: Proposal[]) {
    this.proposals = proposals;
    this.proposalsChanged.next(this.proposals.slice());
  }

  fetchAllProposals() {
    return this.http
      .get<Proposal[]>(`${this.baseUrl}/${ApiPaths.Proposals}`)
      .pipe(
        catchError(this.handleError('fetchAllProposals', [])),
        tap((proposals) => {
          this.setProposals(proposals);
        })
      );
  }

  fetchUserProposals() {
    return this.http
      .get<Proposal[]>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Proposals}`
      )
      .pipe(
        catchError(this.handleError('fetchUserProposals', [])),
        tap((proposals) => {
          this.setProposals(proposals);
        })
      );
  }

  fetchUserProposalsForStudent(profId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('available', true);
    return this.http
      .get<Proposal[]>(
        `${this.baseUrl}/${ApiPaths.Users}/${profId}/${ApiPaths.Proposals}`,
        { params: queryParams }
      )
      .pipe(
        catchError(this.handleError('fetchUserProposals', [])),
        tap((proposals) => {
          this.setProposals(proposals);
        })
      );
  }

  fetchAssignableUserProposals() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('available', true);
    return this.http
      .get<Proposal[]>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Proposals}`,
        { params: queryParams }
      )
      .pipe(
        catchError(this.handleError('fetchAvailableUserProposals', [])),
        tap((proposals) => {
          this.setProposals(proposals);
        })
      );
  }

  addUserProposal(newProposal: Proposal) {
    return this.http
      .post<Proposal>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Proposal}/save`,
        newProposal
      )
      .pipe(
        catchError(this.handleError('addUserProposal', newProposal)),
        tap((addedProposal) => {
          this.proposals.push(addedProposal);
          this.proposalsChanged.next(this.proposals.slice());
        })
      )
      .subscribe();
  }

  updateUserProposal(index: number, updatedProposal: Proposal) {
    const propId = updatedProposal.id;
    return this.http
      .put<Proposal>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Proposals}/${propId}/update`,
        updatedProposal
      )
      .pipe(
        catchError(this.handleError('updateUserProposal', updatedProposal)),
        tap((updatedProposal) => {
          this.proposals[index] = updatedProposal;
          this.proposalsChanged.next(this.proposals.slice());
        })
      )
      .subscribe();
  }

  deleteUserProposal(index: number) {
    const propId = this.proposals[index].id;
    return this.http
      .delete<Proposal>(
        `${this.baseUrl}/${ApiPaths.Users}/${this.uid}/${ApiPaths.Proposals}/${propId}/delete`
      )
      .pipe(
        catchError(this.handleError('deleteUserProposal', propId)),
        tap(() => {
          this.proposals.splice(index, 1);
          this.proposalsChanged.next(this.proposals.slice());
        })
      )
      .subscribe();
  }
}
