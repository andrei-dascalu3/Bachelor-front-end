import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/services/data-storage.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UsersResolverService implements Resolve<User[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    const users = this.userService.getUsers();

    if (users.length === 0) {
      return this.dataStorageService.fetchUsers();
    } else {
      return users;
    }
  }
}
