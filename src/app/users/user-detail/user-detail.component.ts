import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccordService } from 'src/app/accords/services/accord.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  id: number;
  isProfessor = false;
  hasAccordAccepted = false;
  private userSub: Subscription;
  private accordSub: Subscription;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private accordService: AccordService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.userData.subscribe((userData) => {
      if (userData) {
        this.isProfessor = userData.isProfessor;
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.user = this.userService.getUser(this.id);
      if (this.isProfessor) {
        this.accordSub = this.accordService
          .accordsAcceptedByStudentExist(this.user.id)
          .subscribe((result) => {
            this.hasAccordAccepted = result;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.accordSub) {
      this.accordSub.unsubscribe();
    }
  }
}
