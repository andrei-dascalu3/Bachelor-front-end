import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Preference } from '../models/preference.model';
import { PreferenceService } from '../services/preference.service';

@Component({
  selector: 'app-preference-detail',
  templateUrl: './preference-detail.component.html',
  styleUrls: ['./preference-detail.component.css'],
})
export class PreferenceDetailComponent implements OnInit, OnDestroy {
  preference: Preference;
  index: number;
  subscription: Subscription;

  constructor(
    private preferenceService: PreferenceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.preference = this.preferenceService.getPreference(this.index);
    });
  }

  onSubmit(form: NgForm) {
    if (confirm('Are you sure you want to change the rating?')) {
      const updatedPreference = new Preference(
        this.preference.studentId,
        this.preference.proposalId,
        form.value.newRating
      );
      this.preferenceService.updateUserPreference(
        this.index,
        updatedPreference
      );
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onDeletePreference() {
    if (confirm('Are you sure you want to delete the preference?')) {
      this.preferenceService.deleteUserPreference(this.index);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
