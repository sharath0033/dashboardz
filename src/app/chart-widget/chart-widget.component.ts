import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { WidgetService } from '../services';


import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-widget',
  templateUrl: './chart-widget.component.html',
  styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  @Input() widgetId!: string;
  @Input() chartType!: ChartType;
  @Input() widgetMapping!: any;
  @Input() dateRange!: Date[];
  isLoading: boolean = true;
  noDataIndicator: boolean = false;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  chartOptions!: ChartConfiguration['options'];
  chartData!: ChartData;

  constructor(private widgetService: WidgetService) { }

  ngOnInit(): void {
    this.noDataIndicator = false;
    this.subscriptions.add(
      this.widgetService.getWidgetData(this.dateRange)
        .subscribe({
          next: response => {
            if (response?.length) {
              this.initializeData(response);
              this.chart?.render();
            } else {
              this.noDataIndicator = true;
            }
          },
          complete: () => this.isLoading = false,
        })
    );
  }

  initializeData(_data: any[]): void {
    const defaultOptions: ChartConfiguration['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
        },
      }
    }
    switch (this.chartType) {
      case 'pie': {
        this.chartOptions = {
          ...defaultOptions
        };
        this.chartData = this.pieChartFormatter(_data);
        break;
      }
      case 'bar':
      case 'line': {
        this.chartOptions = {
          ...defaultOptions,
          scales: {
            x: {},
            y: {
              min: 10
            }
          },
        };
        this.chartData = {
          labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
          datasets: [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
          ]
        };
        this.barChartFormatter(_data);
        break;
      }
    }
  }

  pieChartFormatter(_data: any[]): any {
    let hashmap: any = {};
    let labels: any[] = [];
    let data: any[] = [];

    _data.forEach(item => {
      const labelKey = item[this.widgetMapping.label];
      hashmap[labelKey] = (hashmap[labelKey] || 0) + item[this.widgetMapping.value];
    })

    Object.entries(hashmap).forEach(([key, value]) => {
      labels.push(key);
      data.push(value);
    })

    return {
      labels,
      datasets: [{ data }]
    }
  }

  barChartFormatter(_data: any[]): any {
    let hashmap: any = {};
    let labels: any[] = [];
    let data: any[] = [];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}