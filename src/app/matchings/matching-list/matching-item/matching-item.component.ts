import { Component, Input, OnInit } from '@angular/core';
import { Matching } from '../../models/matching.model';

@Component({
  selector: 'app-matching-item',
  templateUrl: './matching-item.component.html',
  styleUrls: ['./matching-item.component.css']
})
export class MatchingItemComponent implements OnInit {
  @Input() matching: Matching;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
