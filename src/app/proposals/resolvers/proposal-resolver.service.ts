import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposal.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalResolverService implements Resolve<Proposal[]> {
  constructor(private proposalService: ProposalService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Proposal[] | Observable<Proposal[]> | Promise<Proposal[]> {
    const proposals = this.proposalService.getProposals();
    if(proposals.length === 0) {
      return this.proposalService.fetchUserProposals();
    } else {
      return proposals;
    }
  }
}
