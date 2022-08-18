import { HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService implements OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private preloaderState = new BehaviorSubject<boolean>(false);

  constructor() { }

  setContentTypeHeader(): HttpHeaders {
    let headers = { 'Content-Type': 'application/json' };
    return new HttpHeaders(headers);
  }

  handleError(error: any): Promise<any> {
    /* this.openErrorToster(error); */
    return Promise.reject(error.message || error);
  }

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
