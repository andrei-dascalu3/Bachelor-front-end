import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposal.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
})
export class ProposalListComponent implements OnInit, OnDestroy {
  proposals: Proposal[];
  subscription: Subscription;
  userSub: Subscription;
  isProfessor = false;

  constructor(
    private proposalService: ProposalService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.userSub = this.authService.userData.subscribe((userData) => {
      if (userData) {
        this.isProfessor = userData.isProfessor;
      }
    });
    this.subscription = this.proposalService.proposalsChanged.subscribe(
      (proposals: Proposal[]) => {
        this.proposals = proposals;
      }
    );
    this.proposals = this.proposalService.getProposals();
  }

  onNewProposal() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
