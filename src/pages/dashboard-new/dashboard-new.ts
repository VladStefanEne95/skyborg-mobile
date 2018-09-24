import { Component, Input, ViewChild } from '@angular/core';
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
  selector: 'page-dashboard-new',
  templateUrl: 'dashboard-new.html',
})
export class DashboardNewPage {

	

  constructor(
	public navCtrl: NavController,
	public navParams: NavParams, 
	public UserProvider: UserProvider, 
	public storage: Storage, 
	public OrderProvider: OrderProvider,
	public ProgressBarProvider: ProgressBarProvider,
	public DashboardFilterProvider: DashboardFilterProvider) {
	
  
}


	text: string;
	@ViewChild('barCanvas') barCanvas;
	barChart: any;

ngOnInit() {
	
		   this.barChart = new Chart(this.barCanvas.nativeElement, {
	
			   type: 'bar',
			   data: {
				   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				   datasets: [{
					   label: '# of Votes`12',
					   data: [12, 19, 3, 5, 2, 3],
					   backgroundColor: [
						   'rgba(255, 99, 132, 0.2)',
						   'rgba(54, 162, 235, 0.2)',
						   'rgba(255, 206, 86, 0.2)',
						   'rgba(75, 192, 192, 0.2)',
						   'rgba(153, 102, 255, 0.2)',
						   'rgba(255, 159, 64, 0.2)'
					   ],
					   borderColor: [
						   'rgba(255,99,132,1)',
						   'rgba(54, 162, 235, 1)',
						   'rgba(255, 206, 86, 1)',
						   'rgba(75, 192, 192, 1)',
						   'rgba(153, 102, 255, 1)',
						   'rgba(255, 159, 64, 1)'
					   ],
					   borderWidth: 1
				   }]
			   },
			   options: {
				   scales: {
					   yAxes: [{
						   ticks: {
							   beginAtZero:true
						   }
					   }]
				   }
			   }
	
		   });
		}
}
