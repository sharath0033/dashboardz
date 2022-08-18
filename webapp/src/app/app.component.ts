import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isAppPreloader: boolean = false;
  dashboardsList: any[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.appService.getReloadState()
        .subscribe(_ => this.initializeData())
    );
  }

  initializeData(): void {
    this.isAppPreloader = true;
    this.subscriptions.add(
      this.appService.getDashboardsList()
        .subscribe({
          next: (response) => this.dashboardsList = response,
          complete: () => this.isAppPreloader = false
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
