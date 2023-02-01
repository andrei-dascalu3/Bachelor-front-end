import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Accord } from '../models/accord.model';
import { AccordService } from '../services/accord.service';

@Component({
  selector: 'app-accord-list',
  templateUrl: './accord-list.component.html',
  styleUrls: ['./accord-list.component.css'],
})
export class AccordListComponent implements OnInit {
  accords: Accord[];
  subscription: Subscription;
  searchForm;

  constructor(
    private accordService: AccordService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = formBuilder.group({
      search: '',
    });
  }

  ngOnInit(): void {
    this.subscription = this.accordService.accordsChanged.subscribe(
      (accords: Accord[]) => {
        this.accords = this.accords;
      }
    );
    this.accords = this.accordService.getAccords();
    for (const accord of this.accords) {
      if (accord.accepted) {
        this.accordService.hasAccordAccepted = true;
        break;
      }
    }
  }
}
