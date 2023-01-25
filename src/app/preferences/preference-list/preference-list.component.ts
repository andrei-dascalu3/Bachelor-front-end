import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Preference } from '../models/preference.model';
import { PreferenceService } from '../services/preference.service';

@Component({
  selector: 'app-preference-list',
  templateUrl: './preference-list.component.html',
  styleUrls: ['./preference-list.component.css'],
})
export class PreferenceListComponent implements OnInit {
  preferences: Preference[];
  subscription: Subscription;

  constructor(
    private preferenceService: PreferenceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.preferenceService.preferencesChanged.subscribe(
      (preferences: Preference[]) => {
        this.preferences = preferences;
      }
    );
    this.preferences = this.preferenceService.getPreferences();
  }
}
