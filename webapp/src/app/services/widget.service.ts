import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApplicationService } from 'src/app/core/application';

@Injectable({
    providedIn: 'root'
})
export class WidgetService {
    constructor(
        private http: HttpClient,
        protected applicationService: ApplicationService,
    ) { }

    getDimensions(): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.get<any>(
            `${environment.serviceURL}/dimensions`,
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }

    getWidgetData(_dateRange: Date[]): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.post<any>(
            `${environment.serviceURL}/widgetdata`,
            { dateRange: _dateRange.map((date: Date) => date.toISOString()) },
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }
}