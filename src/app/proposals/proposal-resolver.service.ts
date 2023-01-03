import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Proposal } from './proposal.model';
import { ProposalService } from './proposal.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalResolverService implements Resolve<Proposal[]> {
  constructor(
    private dateStorageService: DataStorageService,
    private proposalService: ProposalService,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Proposal[] | Observable<Proposal[]> | Promise<Proposal[]> {
    const proposals = this.proposalService.getProposals();

    if(proposals.length === 0) {
      const uid = this.authService.currentUser.id;
      return this.dateStorageService.fetchProposals(uid);
    } else {
      return proposals;
    }
  }
}
