import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {
    this.router.events.subscribe((e: Event) => {
      if (e instanceof NavigationStart) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }
}
