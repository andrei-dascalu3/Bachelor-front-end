import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proposal } from '../proposal.model';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css'],
})
export class ProposalListComponent implements OnInit {
  proposals: Proposal[];
  subscription: Subscription;

  constructor(
    private proposalService: ProposalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
