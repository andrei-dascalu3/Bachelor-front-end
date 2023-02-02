import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Matching } from '../models/matching.model';
import { MatchingService } from '../services/matching.service';

@Component({
  selector: 'app-matching-list',
  templateUrl: './matching-list.component.html',
  styleUrls: ['./matching-list.component.css'],
})
export class MatchingListComponent implements OnInit {
  matchings: Matching[];
  subscription: Subscription;
  searchForm;

  constructor(
    private matchingService: MatchingService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = formBuilder.group({
      search: '',
    });
  }

  ngOnInit(): void {
    this.subscription = this.matchingService.matchingsChanged.subscribe(
      (matchings: Matching[]) => {
        this.matchings = matchings
      }
    );
    this.matchings = this.matchingService.getMatchings();
  }
}
