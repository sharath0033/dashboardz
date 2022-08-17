import { Component, OnDestroy, OnInit } from '@angular/core';
import { KtdGridLayout, KtdGridLayoutItem, ktdTrackById } from '@saras-analytics/angular-grid-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  maxReportDate: Date = new Date();
  dashboardId: number = 0;
  dahboardCompactType: 'vertical' | 'horizontal' | null = 'vertical';
  dashboardLayout: KtdGridLayout = []
  trackById = ktdTrackById;
  dashboardDateRange: any = null;
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

  constructor() { }

  ngOnInit(): void {
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

  addWidgetToLayout() {
    const maxId = this.dashboardLayout.reduce((acc, cur) => Math.max(acc, parseInt(cur.id, 10)), -1);
    const lastItem = this.dashboardLayout[this.dashboardLayout.length - 1]
    const nextId = maxId + 1;
    const newWidgetItem: KtdGridLayoutItem = {
      id: nextId.toString(),
      x: 0,
      y: lastItem ? (lastItem.y + lastItem.h) : 0,
      w: 4,
      h: 4,
      data: {
        entityseqno: nextId,
        keyid: 0,
        widgetId: null,
        widgetTypeId: null,
        widgetName: null,
        widgetCategoryId: null,
      }
    };
    // Important: Don't mutate the array, create new instance. This way notifies the Grid component that the layout has changed.
    this.dashboardLayout = [
      ...this.dashboardLayout,
      newWidgetItem
    ];
  }

  onLayoutUpdated(layout: KtdGridLayout) {
    this.dashboardLayout = layout;
  }

  ktdArrayRemoveItem<T>(array: T[], condition: (item: T) => boolean) {
    const arrayCopy = [...array];
    const index = array.findIndex((item) => condition(item));
    if (index > -1) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  }

  removeItem(id: string) {
    this.dashboardLayout = this.ktdArrayRemoveItem(this.dashboardLayout, (item: any) => item.id === id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
