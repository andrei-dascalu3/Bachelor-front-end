import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
export class UserListAltComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'email', 'type', 'picture'];

  users: User[];
  subscription: Subscription;
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getPageDetails(event:any) {
    console.log(event);
  }
  
  ngOnInit(): void {
    this.subscription = this.userService.usersChanged.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
    this.users = this.userService.getUsers();
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
