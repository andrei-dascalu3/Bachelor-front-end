import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-user-list-alt',
  templateUrl: './user-list-alt.component.html',
  styleUrls: ['./user-list-alt.component.css'],
})
export class UserListAltComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'type',
    'picture',
  ];

  users: User[];
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.users = this.userService.getUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
