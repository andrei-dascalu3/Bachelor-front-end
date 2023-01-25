import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/users/services/user.service';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposal.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalStudentResolverService implements Resolve<Proposal[]> {
  constructor(
    private userService: UserService,
    private proposalService: ProposalService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Proposal[] | Observable<Proposal[]> | Promise<Proposal[]> {
    const profIndex = +route.paramMap.get('id');
    const profId = this.userService.getUser(profIndex).id;
    return this.proposalService.fetchUserProposalsForStudent(profId);
  }
}
