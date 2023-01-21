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
export class ProfessorsResolverService implements Resolve<User[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    const professors = this.userService.getUsers();

    if (professors.length === 0) {
      return this.dataStorageService.fetchProfessors();
    } else {
      return professors;
    }
  }
}
