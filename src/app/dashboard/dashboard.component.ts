import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  isEdit: boolean = false;
  dashboardId: string;
  dashboardLayout: KtdGridLayout = []
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
    name: new FormControl(null, Validators.required),
    daterange: new FormControl(this.bsConfig.ranges[0].value, Validators.required),
    widgets: new FormArray([])
  });

  constructor(route: ActivatedRoute) {
    this.dashboardId = route.snapshot.paramMap.get('dashboardId') || '0';
    if (this.dashboardId === 'create') {
      this.editDashboard();
    }
  }

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

  addWidgetToLayout(): void {
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
  }

  discardChanges(): void {
    this.isEdit = false;
  }

  saveChanges(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
