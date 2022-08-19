import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Subscription } from 'rxjs';

import { WidgetService } from '../services';



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
        const scales = this.widgetMapping.yaxis.map((item: string) => {
          return
        })
        this.chartOptions = {
          ...defaultOptions,
          scales: {
            x: {
              title: {
                display: true,
                text: this.titleCase(this.widgetMapping.xaxis)
              },
            },
            y: {
              title: {
                display: true,
                text: this.widgetMapping.yaxis.map((item: string) => this.titleCase(item)).join(', ')
              },
            },
          },
        };
        this.chartData = this.barChartFormatter(_data);
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
    let datasets: any[] = [];

    _data.forEach(item => {
      this.widgetMapping.yaxis.forEach((yaxis: string) => {
        const labelKey = item[this.widgetMapping.xaxis];
        if (!hashmap[yaxis]) {
          hashmap[yaxis] = {};
        }
        hashmap[yaxis][labelKey] = (hashmap[yaxis][labelKey] || 0) + item[yaxis];
      });
    })

    Object.entries(hashmap).forEach((item: any) => {
      labels = [];
      let data: any[] = [];
      Object.entries(item[1]).forEach(([key, value]) => {
        labels.push(key);
        data.push(value);
      })
      datasets.push({
        data,
        label: this.titleCase(item[0])
      })
    })

    return { labels, datasets }
  }

  titleCase(_string: string): string {
    let sentence = _string.toLowerCase().split('_');
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }

    return sentence.join('');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}