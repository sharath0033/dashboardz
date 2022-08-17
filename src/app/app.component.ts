import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isSplashLoading: boolean = true;
  isAppPreloader: boolean = false;
  routeLoading: boolean = true;

  dashboardsList: any[] = [{
    id: '23w4edfvbn6r5t7y',
    name: 'Revenue Dashboard'
  }, {
    id: 'nj5nk4t5n98ferefrn',
    name: 'Advertising Dashboard'
  }, {
    id: '87f44r8rnrv9r8hvr9r',
    name: 'Marketing Dashboard'
  }]

  constructor() {
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
