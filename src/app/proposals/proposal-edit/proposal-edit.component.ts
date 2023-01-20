import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Proposal } from '../proposal.model';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css'],
})
export class ProposalEditComponent implements OnInit {
  isLoading = false;
  isTopic = true;
  id: number;
  isEditMode = false;
  proposal: Proposal = new Proposal(null, null, null);

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      if (this.isEditMode) {
        this.proposal = this.proposalService.getProposal(this.id);
      }
    });
  }

  onSubmit(form: NgForm) {
    if(this.isEditMode) {
      this.proposalService.updateProposal(this.id, form.value);
    } else {
      const uid = +localStorage.getItem("uid");
      this.proposalService.addProposal(form.value);
    }
  }

  onCancel() {}

  onSwitch() {
    this.isTopic = !this.isTopic;
  }
}
