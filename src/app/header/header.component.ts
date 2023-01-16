import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isProfessor = false;
  isAdmin = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.userData.subscribe(userData => {
      this.isAuthenticated = !!userData;
      this.isProfessor = userData.isProfessor;
      this.isAdmin = "ROLE_ADMIN" in userData.roles;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
