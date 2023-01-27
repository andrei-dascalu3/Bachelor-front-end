import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AccordService } from 'src/app/accords/services/accord.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PreferenceService } from 'src/app/preferences/services/preference.service';
import { UserService } from 'src/app/users/services/user.service';
import { Proposal } from '../models/proposal.model';
import { ProposalService } from '../services/proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css'],
})
export class ProposalDetailComponent implements OnInit, OnDestroy {
  proposal: Proposal;
  index: number;
  paramsSub: Subscription;
  prefSub: Subscription;
  isProfessor = false;
  uid: number;
  isAdded = false;
  isAssigning = false;

  constructor(
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router,
    private prefService: PreferenceService,
    private accordService: AccordService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.router.url.includes('/assign/')) {
      this.isAssigning = true;
    }
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? +userData.uid : null;
    this.isProfessor = userData ? userData.isProfessor : false;
    this.paramsSub = this.route.params.pipe().subscribe((params: Params) => {
      this.index = +params['index'];
      this.proposal = this.proposalService.getProposal(this.index);
      if (!this.isProfessor) {
        this.prefSub = this.prefService
          .studentHasProposal(this.uid, this.proposal.id)
          .subscribe((result) => {
            this.isAdded = result;
          });
      }
    });
  }

  onEditProposal() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteProposal() {
    if (confirm('Are you sure you want to delete the proposal?')) {
      this.proposalService.deleteUserProposal(this.index);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onAddToPreferences() {
    if (confirm('Do you want to add to preferences?')) {
      this.prefService.addUserPreference(this.proposal.id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onAssignProposal() {
    if (confirm('Do you want to assign proposal to student?')) {
      const index = +this.route.snapshot.paramMap.get('id');
      const student = this.userService.getUser(index);
      this.accordService.addAccord(student.id, this.proposal.id);
      this.router.navigate(['students']);
    }
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    if (this.prefSub) {
      this.prefSub.unsubscribe();
    }
  }
}
