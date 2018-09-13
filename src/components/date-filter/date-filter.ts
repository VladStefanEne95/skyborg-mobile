import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRange, DateRangeType} from './date-range.interface';
import * as moment from 'moment';

import { CalendarComponentOptions } from 'ion2-calendar';


@Component({
  selector: 'date-filter',
  templateUrl: 'date-filter.html'
})
export class DateFilterComponent implements OnInit {

    @Input() selectedDateRange: DateRange;
    @Input() showIntervalPicker = true;
    @Input() showButton = true;
    @Output() onFilter: EventEmitter<DateRange> = new EventEmitter<DateRange>();
	showDatePickers = false;

	dateRange2: { from: string; to: string; };
	type: 'string';
	optionsRange: CalendarComponentOptions = {
	  pickMode: 'range',
	  from: new Date(2014, 1, 1),
      to: new Date(),  
	};
	

	dateRangePicker;

	ngOnInit() {
		this.dateRangePicker = "Today";
	}
	
	
	onChangeCalendar(event) {
		this.selectedDateRange = this.dates[11];
		this.selectedDateRange.start = event.from;
		this.selectedDateRange.end = event.to;
		this.onFilter.emit(this.selectedDateRange);
	}

    today: moment.Moment = moment().endOf('day');
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
            start: moment().subtract(8, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last30Days,
            title: 'Last 30 Days',
            start: moment().subtract(31, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last60Days,
            title: 'Last 60 Days',
            start: moment().subtract(61, 'days').startOf('day'),
            end: moment().subtract(1, 'days').endOf('day')
        },
        {
            intervalType: DateRangeType.Last90Days,
            title: 'Last 90 Days',
            start: moment().subtract(91, 'days').startOf('day'),
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


    onClick() {
        this.onFilter.emit(this.selectedDateRange);
    }



	public optionsFn(): void {
		for (let i = 0; i < this.dates.length; i++) {
			if (this.dateRangePicker == this.dates[i].title) {
				this.selectedDateRange = this.dates[i]
			}
		}
		this.onFilter.emit(this.selectedDateRange);
	}


	
	
}
