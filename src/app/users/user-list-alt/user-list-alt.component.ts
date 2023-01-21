import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-user-list-alt',
  templateUrl: './user-list-alt.component.html',
  styleUrls: ['./user-list-alt.component.css'],
})
export class UserListAltComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'username', 'type', 'actions'];

  users: User[];
  subscription: Subscription;
  dataSource: MatTableDataSource<User>;
  sortedData: User[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getPageDetails(event: any) {}

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.lastName, b.lastName, isAsc);
        case 'username':
          return compare(a.username, b.username, isAsc);
        default:
          return 0;
      }
    });
  }

  filterChanged(event: Event) {
    const fillValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = fillValue;
    console.log(this.dataSource);
    console.log(this.dataSource.filteredData.length);
    
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
