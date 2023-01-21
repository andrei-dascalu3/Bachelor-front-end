import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css'],
})
export class ProposalDetailComponent implements OnInit {
  proposal: Proposal;
  index: number;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.proposal = this.proposalService.getProposal(this.index);
      console.log(this.index);
    });
  }

  onEditProposal() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProposal() {
    this.proposalService.deleteUserProposal(this.index);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
