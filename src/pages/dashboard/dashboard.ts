import { Component, Input, ViewChildren, ElementRef, ViewChild, QueryList, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetails, StatType, Stat, StatsResponse, StatsRequestDate } from '../../models/dashboard/dashboardTypes';
import { DateRange, DateRangeType } from '../../components/date-filter/date-range.interface';
import { UserProvider } from '../../providers/user/user';
import * as moment from 'moment';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';




import * as $ from "jquery";
import 'slick-carousel/slick/slick'

import { OrderProvider } from '../../providers/order/order';
import { ProgressBarProvider } from '../../providers/progress-bar/progress-bar';
import { DashboardFilterProvider } from '../../providers/dashboard-filter/dashboard-filter';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

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

	
	@ViewChildren('statsList') things: QueryList<any>;

  constructor (
	public navCtrl: NavController,
	public navParams: NavParams, 
	public UserProvider: UserProvider, 
	public storage: Storage, 
	public OrderProvider: OrderProvider,
	public ProgressBarProvider: ProgressBarProvider,
	public DashboardFilterProvider: DashboardFilterProvider,
	public cdRef:ChangeDetectorRef) {
	
		const date = <DateRange>{ intervalType: DateRangeType.Today, title: 'Today', start: undefined, end: undefined };
		this.onFilterChanged(date);
}


  ngAfterViewInit() {
	this.monthToDateVsLastMonth();
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
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
}
