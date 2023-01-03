import { Injectable } from '@angular/core';
import { User } from '../users/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: User;
  
  constructor() { }
}
