import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';

import { User } from '../users/user.model';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  fetchStudents() {
    return this.http.get<User[]>(`${this.baseUrl}/${ApiPaths.Students}`);
  }
}
