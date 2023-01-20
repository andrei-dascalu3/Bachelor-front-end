import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/services/data-storage.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class StudentsResolverService implements Resolve<User[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User[] | Observable<User[]> | Promise<User[]> {
    const students = this.userService.getUsers();

    if (students.length === 0) {
      return this.dataStorageService.fetchStudents();
    } else {
      return students;
    }
  }
}
