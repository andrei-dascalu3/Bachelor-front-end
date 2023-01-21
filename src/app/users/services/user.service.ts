import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersChanged = new Subject<User[]>();

  private users: User[] = [];

  constructor() {}

  getUsers(): User[] {
    return this.users.slice();
  }

  getUser(index: number): User {
    return this.users[index];
  }

  setUsers(users: User[]): void {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  clearUsers(): void {
    this.users = [];
  }
}
