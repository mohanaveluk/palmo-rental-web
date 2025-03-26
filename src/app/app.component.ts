import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('sidenav') sidenav!: MatSidenav;
  title = 'Next Event';
  subtitle = 'Party Supplies';
  
  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private viewportScroller: ViewportScroller) {
    /*
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (this.sidenav) {
          if (result.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }
      });
      */
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //window.scrollTo(0, 0);
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });    
  }

  onActivate(event: Event) {
    window.scrollTo(0, 0);
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}