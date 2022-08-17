import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApplicationService } from 'src/app/core/application';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private http: HttpClient,
        protected appService: ApplicationService,
    ) { }

    getDashboardsList(): Observable<any> {
        const headers = this.appService.setContentTypeHeader();
        return this.http.get<any>(
            `${environment.serviceURL}/dashboards`,
            { headers }
        ).pipe(
            catchError(err => this.appService.handleError(err))
        );
    }
}