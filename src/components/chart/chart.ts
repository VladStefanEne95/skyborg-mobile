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
        type: 'line',
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
                labels: {
                    usePointStyle: true
                }
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
    
        if(this.chartInitialized) {
            this.chart.destroy();
        }else {
            this.chartInitialized = true;
        }

        this.canvas = document.getElementById("chart2");
        this.ctx = this.canvas.getContext('2d');

        setTimeout(()=>{
            this.canvas.style.height = this.height ? this.height : '400px';
            this.canvas.style.width = this.width ? this.width : null;

            this.chart = new Chart(this.ctx, this.chartConfigs);
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
            salesLastMonthData.push(item.grossSales);
            profitLastMonthData.push(item.netAmount);
        });

        this.timeScale = daysLastMonth;

        data['monthToDate'].forEach(item => {
            salesMtdData.push(item.grossSales);
            profitMtdData.push(item.netAmount);
        });

        const salesMTD = {
            data: salesMtdData,
            dataSources: data.monthToDate,
            label: 'Sales MTD',
            borderColor: "#3e95cd",
            fill: false,
            pointStyle: 'circle',
            pointRadius: 6,
            pointHoverRadius: 10
        };
        const salesLastMonth = {
            data: salesLastMonthData,
            dataSources: data.lastMonth,
            label: 'Sales Last Month',
            borderColor: "#8e5ea2",
            fill: false,
            pointStyle: 'rectRot',
            pointRadius: 10,
            pointHoverRadius: 15
        };
        const profitMTD = {
            data: profitMtdData,
            dataSources: data.monthToDate,
            label: 'Profit MTD',
            borderColor: "#3cba9f",
            fill: false,
            pointStyle: 'rect',
            pointRadius: 8,
            pointHoverRadius: 12
        };
        const profitLastMonth = {
            data: profitLastMonthData,
            dataSources: data.lastMonth,
            label: 'Profit Last Month',
            borderColor: "#e8c3b9",
            fill: false,
            pointStyle: 'triangle',
            pointRadius: 8,
            pointHoverRadius: 12
        };

        this.chartData = [salesMTD, salesLastMonth, profitMTD, profitLastMonth];
        this.chartConfigs.options.title.text = 'Month To Date vs Last Month';
        this.chartConfigs.data.labels = this.timeScale;
        this.chartConfigs.data.datasets = this.chartData;
    }

}
