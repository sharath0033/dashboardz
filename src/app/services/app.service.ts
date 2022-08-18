import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApplicationService } from 'src/app/core/application';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private reloadState = new BehaviorSubject<boolean>(true);

    constructor(
        private http: HttpClient,
        protected applicationService: ApplicationService,
    ) { }

    setReloadState(_value: boolean) {
        this.reloadState.next(_value);
    }

    getReloadState() {
        return this.reloadState.asObservable();
    }

    getDashboardsList(): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.get<any>(
            `${environment.serviceURL}/dashboards`,
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }
}