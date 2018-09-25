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
	private salesMtdData = []; 
	private profitMtdData = []; 
	private salesLastMonthData = []; 
	private profitLastMonthData = [];

	private salesMTD; 
	private salesLastMonth; 
	private profitMTD;
	private profitLastMonth;

	private chartInitialized: boolean = false;
    private canvas: any;
	private ctx: any;
	private monthButton = "Last Month";
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
					stacked: true
                }], xAxes: [{ 
					stacked: true 
				}],
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
                       // this.chartPointData.emit({event: 'chart-point-hovered', data: dataSource});
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


        data['lastMonth'].forEach(item => {
			daysLastMonth.push(item._id['day']);
        });

        this.timeScale = daysLastMonth;

        data['monthToDate'].forEach(item => {
			let costs = item.grossSales - item.netAmount;
            this.salesMtdData.push(costs.toFixed(2));
            this.profitMtdData.push(item.netAmount.toFixed(2));
        });

        this.salesMTD = {
            data: this.salesMtdData,
            dataSources: data.monthToDate,
            label: 'Revenue MTD',
            backgroundColor: "#F29813",
            fill: false,
        };
        this.profitMTD = {
            data: this.profitMtdData,
            dataSources: data.monthToDate,
            label: 'Profit MTD',
            backgroundColor: "#3cba9f",
            fill: false,
        };
		
        this.chartData = [this.profitMTD, this.salesMTD];
        this.chartConfigs.options.title.text = 'Month To Date vs Last Month';
        this.chartConfigs.data.labels = this.timeScale;
        this.chartConfigs.data.datasets = this.chartData;
	}
	toggleChartMonth() {

		this.chartData = [];
		this.salesLastMonthData = [];
		this.salesMtdData = [];
		this.profitLastMonthData = [];
		this.profitMtdData = [];

		if (this.monthButton == "Last Month") {
			this.data['lastMonth'].forEach(item => {
				let costs = item.grossSales - item.netAmount;
				this.salesLastMonthData.push(costs.toFixed(2));
				this.profitLastMonthData.push(item.netAmount.toFixed(2));
			});

			this.salesLastMonth = {
				data: this.salesLastMonthData,
				dataSources: this.data.lastMonth,
				label: 'Sales Last Month',
				backgroundColor: "#F29813",
				fill: false,
			};

			this.profitLastMonth = {
				data: this.profitLastMonthData,
				dataSources: this.data.lastMonth,
				label: 'Profit Last Month',
				backgroundColor: "#3cba9f",
				fill: true,
			};
			this.chartData = [this.profitLastMonth, this.salesLastMonth];

			this.monthButton = "Curent month";
		} else if (this.monthButton == "Curent month") {
			this.data['monthToDate'].forEach(item => {
				let costs = item.grossSales - item.netAmount;
				this.salesMtdData.push(costs.toFixed(2));
				this.profitMtdData.push(item.netAmount.toFixed(2));
			});
			this.salesMTD = {
				data: this.salesMtdData,
				dataSources: this.data.monthToDate,
				label: 'Revenue MTD',
				backgroundColor: "#F29813",
				fill: false,
			};

			this.profitMTD = {
				data: this.profitMtdData,
				dataSources: this.data.monthToDate,
				label: 'Profit MTD',
				backgroundColor: "#3cba9f",
				fill: false,
			};
			this.chartData = [this.profitMTD, this.salesMTD];
			this.monthButton = "Last Month";
		}

		this.chartConfigs.data.datasets = this.chartData;

		this.chart.update();
	}

}
