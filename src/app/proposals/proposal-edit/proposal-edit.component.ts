import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposal.service';

@Component({
  selector: 'app-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css'],
})
export class ProposalEditComponent implements OnInit {
  isLoading = false;
  isTopic = true;
  index: number;
  isEditMode = false;
  proposal: Proposal = new Proposal(null, null, null);

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.isEditMode = params['index'] != null;
      if (this.isEditMode) {
        this.proposal = this.proposalService.getProposal(this.index);
        this.isTopic = !!this.proposal.places;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.isEditMode) {
      const updatedProposal = new Proposal(
        form.value.title,
        form.value.description,
        form.value.resources
      );
      updatedProposal.id = this.proposal.id;
      updatedProposal.places = this.isTopic ? form.value.places : null;
      this.proposalService.updateUserProposal(this.index, updatedProposal);
    } else {
      this.proposalService.addUserProposal(form.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSwitch() {
    this.isTopic = !this.isTopic;
  }
}
