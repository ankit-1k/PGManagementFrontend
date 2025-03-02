import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showHeader = true;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/login'; // Hide header on login route
    });
  }
}
