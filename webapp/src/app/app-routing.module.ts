import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'dashboards/create',
  pathMatch: 'full'
}, {
  path: 'dashboards',
  redirectTo: 'dashboards/create',
  pathMatch: 'full'
}, {
  path: 'dashboards/:dashboardId',
  component: DashboardComponent,
}, {
  path: '**',
  redirectTo: 'dashboards/create'
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
