import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common'
import { Chart } from 'chart.js';
import { OrderProvider } from '../../providers/order/order';
import * as moment from 'moment';
import { MonthToDateVsLastMonth } from './chart.interface';


@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent implements OnInit {
    @Input() height: number;
    @Input() width: number;
    @Input() data: any;
    @Output() chartPointData = new EventEmitter();

	@ViewChild('chart') chartId: ElementRef ;

    private chart: any = [];
    private chartInitialized: boolean = false;
    private canvas: any;
    private ctx: any;
    private timeScale: Array<number> = [];
    private chartData: Array<any> = [];
    private chartConfigs = {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: ''
            },
			legend: {
				position: 'bottom',
				onClick: function(e, legendItem) {
				  var index = legendItem.datasetIndex;
				  var ci = this.chart;
				  var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;       
				  var anyOthersAlreadyHidden = false;
				  var allOthersHidden = true;
		
				  // figure out the current state of the labels
				  ci.data.datasets.forEach(function(e, i) {
					var meta = ci.getDatasetMeta(i);
					
					if (i !== index) {
					  if (meta.hidden) {
						anyOthersAlreadyHidden = true;
					  } else {
						allOthersHidden = false;
					  }
					}
				  });
				  
				  // if the label we clicked is already hidden 
				  // then we now want to unhide (with any others already unhidden)
				  if (alreadyHidden) {
					ci.getDatasetMeta(index).hidden = null;
				  } else { 
					// otherwise, lets figure out how to toggle visibility based upon the current state
					ci.data.datasets.forEach(function(e, i) {
					  var meta = ci.getDatasetMeta(i);
		
					  if (i !== index) {
						// handles logic when we click on visible hidden label and there is currently at least
						// one other label that is visible and at least one other label already hidden
						// (we want to keep those already hidden still hidden)
						if (anyOthersAlreadyHidden && !allOthersHidden) {
						  meta.hidden = true;
						} else {
						  // toggle visibility
						  meta.hidden = meta.hidden === null ? !meta.hidden : null;
						}
					  } else {
						meta.hidden = null;
					  }
					});
				  }		
				  ci.update();
				},
			  },            
			  scales: {
                yAxes: [{
                    ticks: {
                        callback: (label, index, labels) => {
                            return label;
                        }
                    },
                }]
			},
			
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        const dataSet = data.datasets[tooltipItem.datasetIndex];
                        const dataSource = dataSet.dataSources.find(item => item._id.day == tooltipItem.xLabel);
                        let label = dataSet.label || '';

                        if (label) {
                            tooltipItem.xLabel = label;
                            label += ': ';
                        }
                        label += tooltipItem.yLabel;
                        this.chartPointData.emit({event: 'chart-point-hovered', data: dataSource});
                        return label;
                    }
                }
            }
        }
    };

	ngOnInit() {
	}
	
	ngOnChanges(changes): void {
        if(this.data) {
            this.monthToDateVsLastMonth(this.data);
            this.initChart();
        }
    }

    ngAfterViewInit() { }

    initChart() {
    
        if (this.chartInitialized) {
            this.chart.destroy();
        } else {
            this.chartInitialized = true;
        }

        this.canvas = this.chartId.nativeElement;
        

        setTimeout(()=>{
            this.canvas.style.height = this.height ? this.height : '400px';
            this.canvas.style.width = this.width ? this.width : null;

            this.chart = new Chart(this.canvas, this.chartConfigs);
        },500);

    }

    monthToDateVsLastMonth(data: MonthToDateVsLastMonth) {
        this.timeScale = [];
        this.chartData = [];
        const daysLastMonth = [];
        const salesMtdData = [], 
              profitMtdData = [], 
              salesLastMonthData = [], 
              profitLastMonthData = [];

        data['lastMonth'].forEach(item => {
            daysLastMonth.push(item._id['day']);
            salesLastMonthData.push(item.grossSales.toFixed(2));
            profitLastMonthData.push(item.netAmount.toFixed(2));
        });

        this.timeScale = daysLastMonth;

        data['monthToDate'].forEach(item => {
            salesMtdData.push(item.grossSales.toFixed(2));
            profitMtdData.push(item.netAmount.toFixed(2));
        });

        const salesMTD = {
            data: salesMtdData,
            dataSources: data.monthToDate,
            label: 'Sales MTD',
            backgroundColor: "#3e95cd",
            fill: false,
        };
        const salesLastMonth = {
            data: salesLastMonthData,
            dataSources: data.lastMonth,
            label: 'Sales Last Month',
            backgroundColor: "#8e5ea2",
            fill: false,
        };
        const profitMTD = {
            data: profitMtdData,
            dataSources: data.monthToDate,
            label: 'Profit MTD',
            backgroundColor: "#3cba9f",
            fill: false,
        };
        const profitLastMonth = {
            data: profitLastMonthData,
            dataSources: data.lastMonth,
            label: 'Profit Last Month',
            backgroundColor: "#e8c3b9",
            fill: true,
        };
		
        this.chartData = [salesMTD, salesLastMonth, profitMTD, profitLastMonth];
        this.chartConfigs.options.title.text = 'Month To Date vs Last Month';
        this.chartConfigs.data.labels = this.timeScale;
        this.chartConfigs.data.datasets = this.chartData;
    }

}
