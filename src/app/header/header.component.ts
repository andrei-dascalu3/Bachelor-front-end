import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isProfessor = false;
  isAdmin = false;
  username: string;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.userData.subscribe((userData) => {
      this.isAuthenticated = !!userData;
      if (this.isAuthenticated) {
        this.isProfessor = userData.isProfessor;
        this.isAdmin = userData.roles.includes('ROLE_ADMIN');
        this.username = userData.username;
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
