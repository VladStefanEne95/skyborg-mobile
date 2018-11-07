import { Component, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateRange, DateRangeType } from '..//date-filter/date-range.interface';
import { NavParams, ViewController } from 'ionic-angular';
import { isEqual, cloneDeep } from 'lodash';


@Component({
  selector: 'add-card-modal',
  templateUrl: 'add-card-modal.html'
})
export class AddCardModalComponent {

	isEqual = isEqual;
	cloneDeep = cloneDeep;
	selectedDateRange: DateRange;
	data;
	isEdit = false;


	dateRanges: DateRange[] = [
        {
            intervalType: DateRangeType.Today,
            title: 'Today',
            start: moment().startOf('day'),
            end: moment().endOf('day'),
        },
        {
            intervalType: DateRangeType.Yesterday,
            title: 'Yesterday',
            start: moment().subtract(1, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last7Days,
            title: 'Last 7 Days',
            start: moment().subtract(7, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last30Days,
            title: 'Last 30 Days',
            start: moment().subtract(30, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last60Days,
            title: 'Last 60 Days',
            start: moment().subtract(60, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last90Days,
            title: 'Last 90 Days',
            start: moment().subtract(90, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.ThisMonth,
            title: 'This Month',
            start: moment().startOf('month'),
            end: moment().endOf('day')
        },
        {
            intervalType: DateRangeType.LastMonth,
            title: 'Last Month',
            start: moment().subtract(1, 'month').startOf('month'),
            end: moment().subtract(1, 'month').endOf('month')
        },
        {
            intervalType: DateRangeType.ThreeMonthsAgo,
            title: 'Three Months Ago',
            start: moment().subtract(3, 'month').startOf('month'),
            end: moment().subtract(3, 'month').endOf('month')
        },
        {
            intervalType: DateRangeType.LastYear,
            title: 'Last Year',
            start: moment().subtract(1, 'year').startOf('year'),
            end: moment().subtract(1, 'year').endOf('year')
        },
        {
            intervalType: DateRangeType.YearToDate,
            title: 'Year to Date',
            start: moment().startOf('year'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.CustomRange,
            title: 'Custom Range',
            start: moment().startOf('day'),
            end: moment().endOf('day'),
        },
    ];


  constructor(public viewCtrl: ViewController, params: NavParams) {
	console.log('Hello AddCardModalComponent Component');
	if (params.get('data'))
		this.data = params.get('data')
  }


  ngOnInit() {
	if (this.data) {
		this.isEdit = true;
		this.selectedDateRange = cloneDeep(this.data);
	} else {
		this.selectedDateRange = cloneDeep(this.dateRanges[0]);
	}
		
}

	cancel() {
		this.viewCtrl.dismiss();
	}

	setCustom(propertyToSet, value) {
		this.selectedDateRange.intervalType = DateRangeType.CustomRange;
		this.selectedDateRange.title = 'Custom Range';
		this.selectedDateRange[propertyToSet] = value.date;
	}
	addNewCard() {
		if (this.isEdit) {
			let result: any = {};
			result = this.cloneDeep(this.selectedDateRange);
			result.editedData = this.data;
			this.viewCtrl.dismiss(result);
		}
		else {
			this.viewCtrl.dismiss(this.selectedDateRange);
		}
	}
}