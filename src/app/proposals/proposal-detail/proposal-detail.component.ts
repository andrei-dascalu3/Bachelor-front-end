import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Proposal } from '../proposal.model';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css'],
})
export class ProposalDetailComponent implements OnInit {
  proposal: Proposal;
  id: number;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.proposal = this.proposalService.getProposal(this.id);
    });
  }

  onEditProposal() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProposal() {
    this.proposalService.deleteProposal(this.id);
    this.router.navigate(['/proposals']);
  }
}
