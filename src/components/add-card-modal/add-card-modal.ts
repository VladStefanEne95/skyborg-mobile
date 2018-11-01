import { Component, EventEmitter, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateRange, DateRangeType } from '..//date-filter/date-range.interface';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddCardModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-card-modal',
  templateUrl: 'add-card-modal.html'
})
export class AddCardModalComponent {

	onAdd = new EventEmitter();
	selectedDateEnd: any;//for calendar
	selectedDateStart: any;
	selectedDateEnd2: any;//for presets
	selectedDateStart2: any;
	presetElement: number = -1;
	isPreset: boolean = false;
	config: any = {
		theme: 'dp-material'
	};
	intervalType = 11; //default custom range
	title = "Custom Range";
	data: any;

	dates: DateRange[] = [
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


  constructor(public viewCtrl: ViewController) {
    console.log('Hello AddCardModalComponent Component');
  }

  ngOnInit() {
	this.selectedDateStart = moment().startOf('day');
	this.selectedDateEnd = moment().startOf('day');
	this.selectedDateStart2 = moment().startOf('day');
	this.selectedDateEnd2 = moment().startOf('day');
	
	if (this.data) {
		this.isPreset = true;
		switch(this.data['dateRange'].intervalType) {
			case DateRangeType.Today:
				this.today();
				break;
			case DateRangeType.Yesterday:
				this.yesterday();
				break;
			case DateRangeType.Last7Days:
				this.lastSevenDays();
				break;
			case DateRangeType.Last30Days:
				this.lastThirtyDays();
				break;
			case DateRangeType.Last60Days:
				this.lastSixtyDays();
				break;
			case DateRangeType.Last90Days:
				this.lastNinetyDays();
				break;
			case DateRangeType.ThisMonth:
				this.thisMonth();
				break;
			case DateRangeType.LastMonth:
				this.lastMonth();
				break;
			case DateRangeType.LastYear:
				this.lastYear();
				break;
			case DateRangeType.ThreeMonthsAgo:
				this.threeMonthsAgo();
				break;
			case DateRangeType.YearToDate:
				this.yearToDate();
				break;
			default:
				this.intervalType = DateRangeType.CustomRange;
				this.title = "Custom Range";
				this.isPreset = false;
				this.presetElement = -1;
				this.selectedDateStart = this.data['dateRange'].start;
				this.selectedDateEnd = this.data['dateRange'].end;
				break;
		}
	}
		
}

onNoClick() {
	this.viewCtrl.dismiss({});
}

addNewCard() {
	if (this.selectedDateStart === undefined)
		this.selectedDateStart = moment().startOf('day');

	if (this.selectedDateEnd === undefined)
		this.selectedDateEnd = moment().startOf('day');

	if (!moment(this.selectedDateStart).isBefore(this.selectedDateEnd)) {
		let tmp = this.selectedDateStart;
		this.selectedDateStart = this.selectedDateEnd;
		this.selectedDateEnd = tmp;
	}

	let emitData;

	if (this.isPreset)
		emitData = { start:this.selectedDateStart2, end:this.selectedDateEnd2, intervalType: this.intervalType, title: this.title, editedData: this.data };
	else
		emitData = { start:this.selectedDateStart, end:this.selectedDateEnd, intervalType: this.intervalType, title: this.title, editedData: this.data };
	
	this.viewCtrl.dismiss(emitData);
}

editCard() {
	if (this.selectedDateStart === undefined)
		this.selectedDateStart = moment().startOf('day');

	if (this.selectedDateEnd === undefined)
		this.selectedDateEnd = moment().startOf('day');

	if (!moment(this.selectedDateStart).isBefore(this.selectedDateEnd)) {
		let tmp = this.selectedDateStart;
		this.selectedDateStart = this.selectedDateEnd;
		this.selectedDateEnd = tmp;
	}

	if (this.isPreset)
		this.onAdd.emit({start:this.selectedDateStart2, end:this.selectedDateEnd2, intervalType: this.intervalType, title: this.title, editedData: this.data});
	else
		this.onAdd.emit({start:this.selectedDateStart, end:this.selectedDateEnd, intervalType: this.intervalType, title: this.title, editedData: this.data});
}

startSelected() {
	this.intervalType = DateRangeType.CustomRange;
	this.title = "Custom Range";
	this.isPreset = false;
	this.presetElement = -1;
}

endSelected() {
	this.intervalType = DateRangeType.CustomRange;
	this.title = "Custom Range";
	this.isPreset = false;
	this.presetElement = -1;
}


today() {
	this.selectedDateStart2 = moment().startOf('day');
	this.selectedDateEnd2 = moment().endOf('day');
	this.intervalType = DateRangeType.Today;
	this.title = "Today";
	this.presetElement = 1;
	this.isPreset = true;
}

yesterday() {
	this.selectedDateStart2 = moment().subtract(1, 'days').startOf('day');
	this.selectedDateEnd2 = moment().subtract(1, 'days').endOf('day');
	this.intervalType = DateRangeType.Yesterday;
	this.title = "Yesterday";
	this.presetElement = 2;
	this.isPreset = true;
}

lastSevenDays() {
	this.selectedDateStart2 = moment().subtract(7, 'days').startOf('day');
	this.selectedDateEnd2 = moment().subtract(1, 'days').endOf('day');
	this.intervalType = DateRangeType.Last7Days;
	this.title = "Last 7 Days";
	this.presetElement = 3;
	this.isPreset = true;
}

lastThirtyDays() {
	this.selectedDateStart2 = moment().subtract(30, 'days').startOf('day');
	this.selectedDateEnd2 = moment().subtract(1, 'days').endOf('day');
	this.intervalType = DateRangeType.Last30Days;
	this.title = "Last 30 Days";
	this.presetElement = 4;
	this.isPreset = true;
}

lastSixtyDays() {
	this.selectedDateStart2 = moment().subtract(60, 'days').startOf('day');
	this.selectedDateEnd2 = moment().subtract(1, 'days').endOf('day');
	this.intervalType = DateRangeType.Last60Days;
	this.title = "Last 60 Days";
	this.presetElement = 5;
	this.isPreset = true;
}

lastNinetyDays() {
	this.selectedDateStart2 = moment().subtract(90, 'days').startOf('day');
	this.selectedDateEnd2 = moment().subtract(1, 'days').endOf('day');
	this.intervalType = DateRangeType.Last90Days;
	this.title = "Last 90 Days";
	this.presetElement = 6;
	this.isPreset = true;
}

thisMonth() {
	this.intervalType = DateRangeType.ThisMonth;
	this.title = 'This Month';
	this.selectedDateStart2 = moment().startOf('month');
	this.selectedDateEnd2 = moment().endOf('day');
	this.presetElement = 7;
	this.isPreset = true;
}
lastMonth() {
	this.intervalType = DateRangeType.LastMonth;
	this.title = 'Last Month';
	this.selectedDateStart2 = moment().subtract(1, 'month').startOf('month');
	this.selectedDateEnd2 = moment().subtract(1, 'month').endOf('month');
	this.presetElement = 8;
	this.isPreset = true;
}
threeMonthsAgo() {
	this.intervalType = DateRangeType.ThreeMonthsAgo;
	this.title = 'Three Months Ago';
	this.selectedDateStart2 = moment().subtract(3, 'month').startOf('month');
	this.selectedDateEnd2 = moment().subtract(3, 'month').endOf('month');
	this.presetElement = 9;
	this.isPreset = true;
}

lastYear() {
	this.intervalType = DateRangeType.LastYear;
	this.title = 'Last Year';
	this.selectedDateStart2 = moment().subtract(1, 'year').startOf('year');
	this.selectedDateEnd2 = moment().subtract(1, 'year').endOf('year');
	this.presetElement = 10;
	this.isPreset = true;
}

yearToDate() {
	this.intervalType = DateRangeType.YearToDate;
	this.title = 'Year to Date';
	this.selectedDateStart2 = moment().startOf('year');
	this.selectedDateEnd2 = moment().subtract(1, 'days').endOf('day');
	this.presetElement = 11;
	this.isPreset = true;
}


}

