import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Accord } from '../models/accord.model';
import { AccordService } from '../services/accord.service';

@Component({
  selector: 'app-accord-detail',
  templateUrl: './accord-detail.component.html',
  styleUrls: ['./accord-detail.component.css'],
})
export class AccordDetailComponent implements OnInit, OnDestroy {
  accord: Accord;
  index: number;
  subscription: Subscription;
  uid: number;
  isProfessor = false;
  status: string;

  constructor(
    private accordService: AccordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));
    this.uid = userData ? +userData.uid : null;
    this.isProfessor = userData ? userData.isProfessor : false;
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.accord = this.accordService.getAccord(this.index);
      if (this.accord.accepted) {
        this.status = 'accepted';
      } else if (this.accordService.hasAccordAccepted && !this.isProfessor) {
        this.status = 'unacceptable';
      }
      else {
        this.status = 'not-accepted';
      }
    });
  }

  onChangeStatus() {
    let message: string;
    if (this.accord.accepted) {
      message =
        'Are you sure you want to unaccept the accord? You may want to talk to your professor first.';
    } else {
      message = 'Are you sure you want to accept the accord?';
    }
    if (confirm(message)) {
      const updatedAccord = JSON.parse(JSON.stringify(this.accord));
      updatedAccord.accepted = !updatedAccord.accepted;
      this.accordService.updateAccord(this.index, updatedAccord);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onDeleteAccord() {
    if (confirm('Are you sure you want to delete the accord?')) {
      this.accordService.deleteAccord(this.index);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
