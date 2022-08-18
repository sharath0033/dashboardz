import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApplicationService } from 'src/app/core/application';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
        private http: HttpClient,
        protected applicationService: ApplicationService,
    ) { }

    getDashboard(dashboardId: string): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.get<any>(
            `${environment.serviceURL}/dashboards/${dashboardId}`,
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }

    createDashboard(payload: any): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.post<any>(
            `${environment.serviceURL}/dashboards`,
            payload,
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }

    updateDashboard(
        dashboardId: string,
        payload: any,
    ): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.put<any>(
            `${environment.serviceURL}/dashboards/${dashboardId}`,
            payload,
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }

    deleteDashboard(dashboardId: string): Observable<any> {
        const headers = this.applicationService.setContentTypeHeader();
        return this.http.delete<any>(
            `${environment.serviceURL}/dashboards/${dashboardId}`,
            { headers }
        ).pipe(
            catchError(err => this.applicationService.handleError(err))
        );
    }
}