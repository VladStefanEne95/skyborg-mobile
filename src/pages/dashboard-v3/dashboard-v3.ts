import { Component, Input, ViewChildren, ElementRef, ViewChild, QueryList, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetails, StatType, Stat, StatsResponse, StatsRequestDate } from '../../models/dashboard/dashboardTypes';
import { DateRange, DateRangeType } from '../../components/date-filter/date-range.interface';
import { UserProvider } from '../../providers/user/user';
import { AppConfigurationsProvider } from '../../providers/app-configurations/app-configurations';
import * as moment from 'moment';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';
import { Select } from 'ionic-angular';



import * as $ from "jquery";
import 'slick-carousel/slick/slick'

import { OrderProvider } from '../../providers/order/order';
import { ProgressBarProvider } from '../../providers/progress-bar/progress-bar';
import { DashboardFilterProvider } from '../../providers/dashboard-filter/dashboard-filter';

@IonicPage()
@Component({
  selector: 'page-dashboard-v3',
  templateUrl: 'dashboard-v3.html',
})
export class DashboardV3Page implements OnInit {

	category = 'Dashboard';
    dateToday: DateRange = {
        intervalType:  DateRangeType.Today,
        title: 'Today',
        start: moment().startOf('day'),
        end: moment().endOf('day'),
    };
    dateRange: DateRange;
    stats: Stat[] = [];
    statsExpanded = false;
    productDetails: Array<ProductDetails> = [];
    chartData: Object;
	chartPointData: Object;
	counter = 0;
	chartState = 1;
	counterArr = [0, 1];
	counterReset = 0;
	filterChangedCounter = 0;
	cardOptions: Array<String> = [];
	

	public metrics = [
		{ label: 'Revenue', isSelected: true },
		{ label: 'Profit', isSelected: true },
        { label: 'Orders', isSelected: true },
        { label: 'Units', isSelected: true },
        { label: 'Net ROI', isSelected: false },
        { label: 'Net Margin', isSelected: false },
        { label: 'PPC Revenue', isSelected: false },
        { label: 'Organic Revenue', isSelected: false },
        { label: 'Refunded Units', isSelected: false },
        { label: 'Promo Units', isSelected: false }
    ];


	@ViewChild('selectOptions') select1: Select;
	@ViewChildren('statsList') things: QueryList<any>;

  constructor (
	public navCtrl: NavController,
	public navParams: NavParams, 
	public UserProvider: UserProvider, 
	public storage: Storage, 
	public OrderProvider: OrderProvider,
	public ProgressBarProvider: ProgressBarProvider,
	public DashboardFilterProvider: DashboardFilterProvider,
	public cdRef:ChangeDetectorRef,
	public AppConfigurationsProvider: AppConfigurationsProvider) {
	
		const date = <DateRange>{ intervalType: DateRangeType.Today, title: 'Today', start: undefined, end: undefined };
		this.onFilterChanged(date);

	}

	ngOnInit() {
		this.AppConfigurationsProvider.getDashboardCardOptions().then(response => {
			if (response) 
				this.metrics = response['data'].details.options;
			// no idea why it works only with both foreach's	
			this.metrics.forEach(element => {
				if (element.isSelected == true) {
					this.cardOptions.push(element.label)
				}
			});	
		});
		this.metrics.forEach(element => {
			if (element.isSelected == true) {
				this.cardOptions.push(element.label)
			}
		});
	}


  ngAfterViewInit() {
	this.monthToDateVsLastMonth();
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
	let that = this;
	this.counter++;
	if (this.counter == this.stats.length) {
		$('.myCarousel' + this.counterArr[this.counterArr.length - 2]).slick('unslick');
		$('.myCarousel' + this.counterArr[this.counterArr.length - 1]).css("display", "block");
		$('.myCarousel' + this.counterArr[this.counterArr.length - 2]).css("display", "none");
		$('.myCarousel' + this.counterArr[this.counterArr.length - 1]).slick({
			dots: true,
			centerMode: true,
			infinite: false,
			centerPadding: '30px',
			slidesToShow: 1
		  });

		  $('.myCarousel' + this.counterArr[this.counterArr.length - 1]).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
			  if (nextSlide != currentSlide) {
				that.sendDataToChart(that.stats[nextSlide]);
			  }
		})

		  this.counterArr.push(this.counterArr[this.counterArr.length - 1] + 1);
		 
		  if (this.counterReset != -1)
			this.counterReset = -1;
		 //  this.stats.push(JSON.parse(JSON.stringify(this.stats[0])));
		 //  this.counterArr.push(this.counterArr[this.counterArr.length - 1] + 1);
	}
  }


	getTitleColor(index) {
		
		switch(index) {
			case 0:
				return "days1";
			case 1:
				return "days7";
			case 2:
				return "days14";
			case 3:
				return "days30";
			default:
				return "days1"
		}
	}

	ionViewDidLoad() {
	    $('.myCarousel0').slick({
	      dots: true,
	      centerMode: true,
	      infinite: false,
	      centerPadding: '30px',
	      slidesToShow: 1
	    });
	  }

	
	getProducts(sortType = undefined, by = undefined): void {
		const defaultBy = [
			{ name: 'beginDate', value: this.dateRange.start ? this.dateRange.start : this.dateToday.start }, 
			{ name: 'endDate', value: this.dateRange.end ? this.dateRange.end : this.dateToday.end }
		];

		if(!by) by = defaultBy;
		if(!sortType) sortType = 'desc';

		this.OrderProvider.getOrderProductSales(sortType, by)
			.then(products => {
				this.productDetails = products;
			}, err => {
				console.error('Error on get products request: ', err);
			});
	}


	monthToDateVsLastMonth() {
		const lastMonth = () => {
			return this.OrderProvider.getOrdersSalesStats([
				{ name: 'beginDate', value: moment().subtract(1, 'months').startOf('month') }, 
				{ name: 'endDate', value: moment().subtract(1, 'months').endOf('month') },
				{ name: 'reportTime', value: 'daily' }
			], []);
		};
		const monthToDate = () => { 
			return this.OrderProvider.getOrdersSalesStats([
				{ name: 'beginDate', value: moment().startOf('month') }, 
				{ name: 'endDate', value: this.dateToday.end },
				{ name: 'reportTime', value: 'daily' }
			], []);
		};
		Promise.all([lastMonth(), monthToDate()]).then(result => {
			this.chartData = {
				lastMonth: result[0].slice(1),
				monthToDate: result[1].slice(1)
			};
		})
	}

	onFilterChanged(dateRange: DateRange) {
		this.counter = this.counterReset;
		this.dateRange = dateRange.start || dateRange.end ? dateRange : this.dateToday;
		this.stats = this.DashboardFilterProvider.processDateRange(dateRange)
			.map((requestDate: StatsRequestDate) => {
				const dummyStat: Stat = new Stat();
				dummyStat.title = {
					dateName: requestDate.title,
					dateRange: `${requestDate.start.format('M/D/YY')} - ${requestDate.end.format('M/D/YY')}`,
				};
				dummyStat.type = requestDate.type;
				dummyStat.summary = { grossSales: 2, estProfit: 3, roi: 4, margin: 5 };
				return dummyStat;
			});
			

		let i = 0;
		this.ProgressBarProvider.show();
		this.DashboardFilterProvider.makeRequest$(dateRange)
			.finally(() => this.ProgressBarProvider.hide())
			.subscribe(response => {
				this.stats[i] = Stat.fromJSON(response);
				
				if (this.filterChangedCounter == 0)
					this.filterChangedCounter = 1;
				else if (i == 0){
					this.sendDataToChart(this.stats[0]);
				}
				i++;
			});

		this.getProducts();

	}


	onToggleStats(): void {
		this.statsExpanded = !this.statsExpanded;
	}

	onChartPointDataChange(event): void {	
		this.chartPointData = event.data;
		this.chartState = 0;
	}
	onShowChartChange(event): void {
		this.chartState = 1;
	}

	//for new cards behaviour

	public menuIsOpen: boolean = false;
    public dateRangeIsOpen: boolean = false;
    public selectedDateRange: Object = {
        start : '',
        end : ''
    };
    
	
    toggleMetrics(metric) {
        metric.isSelected = !metric.isSelected;
    }

    toggleDateRange() {
        this.dateRangeIsOpen = !this.dateRangeIsOpen;
    }

    toggleMenu() {
		this.select1.open();
	}
	
	optionsFn() {
		this.metrics.forEach(metric => {
			if ( this.cardOptions.indexOf(metric.label) != -1) {
				metric.isSelected = true;
			} else {
				metric.isSelected = false;
			}
		})
		this.AppConfigurationsProvider.updateDashboardCardOptions(this.metrics);
	}

	customChartData(startDate, endDate) {

		let startDateMoment = moment(startDate, "MM-DD-YYYY").startOf('day');
		let endDateMoment = moment(endDate, "MM-DD-YYYY").endOf('day').add(1, 'days');

		let startDateLastYearMoment = moment(startDate, "MM-DD-YYYY").startOf('day').subtract(1, 'years');
		let endDateLastYearMoment = moment(endDate, "MM-DD-YYYY").endOf('day').subtract(1, 'years');
		

		const lastPeriod = () => {
			return this.OrderProvider.getOrdersSalesStats([
				{ name: 'beginDate', value: startDateLastYearMoment}, 
				{ name: 'endDate', value: endDateLastYearMoment},
				{ name: 'reportTime', value: 'daily' }
			], []);
		};
		

		let periodToDate = () => { 
			return this.OrderProvider.getOrdersSalesStats([
				{ name: 'beginDate', value: startDateMoment }, 
				{ name: 'endDate', value: endDateMoment },
				{ name: 'reportTime', value: 'daily' }
			], []);
		};


		Promise.all([lastPeriod(), periodToDate()]).then(result => {
			this.chartData = {
				lastMonth: result[0].slice(1),
				monthToDate: result[1].slice(1)
			};
		})
		
	}

	sendDataToChart(stat) {
		console.log(stat)
		if (stat.title.dateRange.length == 10) {
			this.monthToDateVsLastMonth();
		} else {
			let startDate = stat.title.dateRange.substring(0, 10);
			let endDate = stat.title.dateRange.substring(13, 23);
			this.customChartData(startDate, endDate);
		}
	}
}
