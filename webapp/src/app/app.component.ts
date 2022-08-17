import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ResolveEnd,
  ActivatedRoute
} from '@angular/router'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isAppPreloader: boolean = false;

  constructor() { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
