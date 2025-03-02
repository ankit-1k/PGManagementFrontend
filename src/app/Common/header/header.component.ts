import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sidebarVisible: boolean = false;
  isAuthenticated = false;
  showHeader: boolean = true; // ✅ Add this line

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.loginService.isLoggedIn();

    // ✅ Listen to route changes and hide the header on the login page
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/login';
    });
  }

  navigateTo(route: string) {
    console.log('Navigating to:', route);
    this.router.navigate([route]); // ✅ Navigate correctly
  }
}
