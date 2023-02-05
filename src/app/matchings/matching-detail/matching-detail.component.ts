import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Matching } from '../models/matching.model';
import { MatchingService } from '../services/matching.service';

@Component({
  selector: 'app-matching-detail',
  templateUrl: './matching-detail.component.html',
  styleUrls: ['./matching-detail.component.css'],
})
export class MatchingDetailComponent implements OnInit, OnDestroy {
  matching: Matching;
  index: number;
  subscription: Subscription;
  uid: number;

  constructor(
    private matchingService: MatchingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? +userData.uid : null;
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.matching = this.matchingService.getMatching(this.index);
      if (this.matching == null) {
        this.router.navigate(['matchings']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
