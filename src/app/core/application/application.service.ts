import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private preloaderState = new BehaviorSubject<boolean>(false);

  constructor() { }

  setPreloader(preloaerShow: boolean) {
    this.preloaderState.next(preloaerShow);
  }

  getPreloaderState() {
    return this.preloaderState.asObservable();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
