import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApplicationService } from './core/application';
import { AppService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isAppPreloader: boolean = false;
  isPreloader: boolean = false;
  dashboardsList: any[] = [];

  constructor(
    private applicationService: ApplicationService,
    private appService: AppService
  ) {
    this.subscriptions.add(
      this.applicationService.getPreloaderState()
        .subscribe((_value: boolean) => this.isAppPreloader = _value)
    )
  }

  ngOnInit() {
    this.subscriptions.add(
      this.appService.getReloadState()
        .subscribe(_ => this.initializeData())
    );
  }

  initializeData(): void {
    this.isPreloader = true;
    this.subscriptions.add(
      this.appService.getDashboardsList()
        .subscribe({
          next: (response) => this.dashboardsList = response,
          complete: () => this.isPreloader = false
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
