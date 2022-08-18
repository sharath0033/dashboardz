import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { KtdGridLayout, KtdGridLayoutItem, ktdTrackById } from '@saras-analytics/angular-grid-layout';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

import { ApplicationService } from 'src/app/core/application';
import { AppService, DashboardService } from '../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  isPreloader: boolean = false;
  maxReportDate: Date = new Date();
  isEdit: boolean = false;
  dashboardId: string = 'create';
  dashboardLayout: KtdGridLayout = [];
  trackById = ktdTrackById;
  bsConfig: any = {
    containerClass: 'theme-default',
    rangeInputFormat: 'MMM DD, YYYY',
    dateInputFormat: 'MMM DD, YYYY',
    showWeekNumbers: false,
    ranges: [{
      value: [new Date(new Date().setDate(new Date().getDate() - 7)), new Date()],
      label: 'Last 7 Days'
    }, {
      value: [new Date(new Date().setDate(new Date().getDate() - 30)), new Date()],
      label: 'Last 30 Days'
    }, {
      value: [new Date(new Date().setDate(new Date().getDate() - 90)), new Date()],
      label: 'Last 90 Days'
    }, {
      value: [new Date(new Date().setDate(new Date().getDate() - 180)), new Date()],
      label: 'Last 180 Days'
    }, {
      value: [new Date(new Date().setDate(new Date().getDate() - 365)), new Date()],
      label: 'Last 365 Days'
    }]
  }

  dashboardForm: FormGroup = new FormGroup({
    name: new FormControl({
      value: null,
      disabled: true
    }, Validators.required),
    daterange: new FormControl(this.bsConfig.ranges[0].value, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private applicationService: ApplicationService,
    private appService: AppService,
    private dashboardService: DashboardService,
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.route.params.subscribe(_params => {
        this.dashboardId = _params.dashboardId;
        if (this.dashboardId === 'create') {
          this.dashboardForm.reset();
          this.dashboardForm.get('daterange')?.setValue(this.bsConfig.ranges[0].value);
          this.editDashboard();
        } else {
          this.initializeData();
        }
      })
    );
  }

  initializeData(): void {
    this.isPreloader = true;
    this.isEdit = false;
    this.dashboardLayout = [];
    this.subscriptions.add(
      this.dashboardService.getDashboard(this.dashboardId)
        .subscribe({
          next: (response) => {
            if (response) {
              this.dashboardForm.get('name')?.setValue(response.name);
              this.dashboardForm.get('daterange')?.setValue(response.daterange.map((date: string) => new Date(date)));
              response.widgets?.forEach((widget: any) => this.dashboardLayout.push(widget));
            } else {
              this.router.navigate(['/dashboard', 'create']);
            }
          },
          complete: () => this.isPreloader = false
        })
    );
  }

  onDateChange(): void {
    /* if (value.length > 0) {
      dashboard.layout.forEach(layoutItem => {
        layoutItem.data.widgetData = null;
        layoutItem.data.widgetLoaded = false;
      });
      this.loadViewsWidgets(dashboard);
    } */
  }

  addWidgetToLayout(_data: any): void {
    const maxId = this.dashboardLayout.reduce((_acc, _cur) => Math.max(_acc, parseInt(_cur.id, 10)), -1);
    const lastItem = this.dashboardLayout[this.dashboardLayout.length - 1]
    const nextId = maxId + 1;
    const newWidgetItem: KtdGridLayoutItem = {
      id: nextId.toString(),
      x: 0,
      y: lastItem ? (lastItem.y + lastItem.h) : 0,
      w: 4,
      h: 4,
      data: _data
    };
    this.dashboardLayout = [...this.dashboardLayout, newWidgetItem];
  }

  onLayoutUpdated(_layout: KtdGridLayout): void {
    this.dashboardLayout = _layout;
  }

  ktdArrayRemoveItem<T>(_array: T[], _condition: (item: T) => boolean): T[] {
    const arrayCopy = [..._array];
    const index = _array.findIndex((item) => _condition(item));
    if (index > -1) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  }

  removeItem(_widgetId: string): void {
    this.dashboardLayout = this.ktdArrayRemoveItem(this.dashboardLayout, (item: any) => item.id === _widgetId);
  }

  editDashboard(): void {
    this.isEdit = true;
    this.dashboardForm.get('name')?.enable();
  }

  discardChanges(): void {
    this.dashboardForm.get('name')?.disable();
    if (this.dashboardId === 'create') {
      this.location.back();
    } else {
      this.initializeData();
    }
  }

  saveChanges(): void {
    this.applicationService.setPreloader(true);

    const payload = {
      name: this.dashboardForm.get('name')?.value,
      daterange: this.dashboardForm.get('daterange')?.value.map((date: Date) => date.toISOString()),
      widgets: this.dashboardLayout.map(item => item)
    };

    if (this.dashboardId === 'create') {
      this.subscriptions.add(
        this.dashboardService.createDashboard(payload).subscribe({
          next: response => {
            this.appService.setReloadState(true);
            this.router.navigate(['/dashboards', response]);
          },
          complete: () => this.applicationService.setPreloader(false),
        })
      );
    } else {
      this.subscriptions.add(
        this.dashboardService.updateDashboard(this.dashboardId, payload).subscribe({
          next: () => {
            this.appService.setReloadState(true);
            this.initializeData();
          },
          complete: () => this.applicationService.setPreloader(false),
        })
      );
    }
  }

  deleteDashboard(): void {
    this.applicationService.setPreloader(true);
    this.subscriptions.add(
      this.dashboardService.deleteDashboard(this.dashboardId).subscribe({
        next: () => {
          this.appService.setReloadState(true);
          this.router.navigate(['/dashboards', 'create']);
        },
        complete: () => this.applicationService.setPreloader(false),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
