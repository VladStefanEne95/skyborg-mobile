import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators/map';

import {Stat, StatsRequestDate, StatType} from '../../models/dashboard/dashboardTypes';
import { DateRange, DateRangeType} from '../../components/date-filter/date-range.interface';
import { StatsProvider } from '../stats/stats';


@Injectable()
export class DashboardFilterProvider {

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

  constructor(public http: HttpClient, public StatsProvider: StatsProvider) {
    console.log('Hello DashboardFilterProvider Provider');
  }

  processOneDay(range?: DateRange): StatsRequestDate[] {
	const result: StatsRequestDate[] = [];
	const startDate: moment.Moment = range ? range.start : moment();
	const endDate: moment.Moment = range ? range.end : moment();
	const title: string = range ? range.title : 'Today';

	result.push(new StatsRequestDate(
		title,
		startDate.clone().startOf('day'),
		endDate.clone().endOf('day'),
		StatType.Green
	));
	return result;
}

processCustomRange(range: DateRange): StatsRequestDate[] {
	const result: StatsRequestDate[] = [];
	const numberOfDays = range.end.diff(range.start, 'days');
	if (numberOfDays === 0) {
		const isToday = moment().diff(range.end, 'days') === 0;
		return this.processOneDay(isToday ? undefined : range);
	} else {
		result.push(new StatsRequestDate(
			'Custom Range',
			range.start.clone().startOf('day'),
			range.end.clone().endOf('day'),
			StatType.Green
		));
	}
	return result;
}

processPresetDateRange(dateRange): DateRange {
	
	if (dateRange.intervalType == DateRangeType.CustomRange)
		return dateRange;
	
	for (let i = 0; i < this.dates.length; i++) {
		if (dateRange.intervalType == this.dates[i].intervalType)
			return this.dates[i];
	}
}



  processDateRange( range: DateRange): StatsRequestDate[] {
	const result: StatsRequestDate[] = [];
	switch (range.intervalType) {
		case DateRangeType.Today: {
			return this.processOneDay();
		}
		case DateRangeType.Yesterday: {
			result.push(new StatsRequestDate(
				'Yesterday',
				moment().subtract(1, 'days').startOf('day'),
				moment().subtract(1, 'days').endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.Last7Days: {
			result.push(new StatsRequestDate(
				'Last 7 Days',
				moment().subtract(7, 'days').startOf('day'),
				moment().subtract(1, 'days').endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.Last30Days: {
			result.push(new StatsRequestDate(
				'Last 30 Days',
				moment().subtract(30, 'days').startOf('day'),
				moment().subtract(1, 'days').endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.Last60Days: {
			result.push(new StatsRequestDate(
				'Last 60 Days',
				moment().subtract(60, 'days').startOf('day'),
				moment().subtract(1, 'days').endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.Last90Days: {
			result.push(new StatsRequestDate(
				'Last 90 Days',
				moment().subtract(90, 'days').startOf('day'),
				moment().subtract(1, 'days').endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.ThisMonth: {
			result.push(new StatsRequestDate(
				'This Month',
				moment().startOf('month'),
				moment().endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.LastMonth: {
			result.push(new StatsRequestDate(
				'Last Month',
				moment().subtract(1, 'month').startOf('month'),
				moment().subtract(1, 'month').endOf('month'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.ThreeMonthsAgo: {
			result.push(new StatsRequestDate(
				'Three Months Ago',
				moment().subtract(3, 'month').startOf('month'),
				moment().subtract(3, 'month').endOf('month'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.LastYear: {
			result.push(new StatsRequestDate(
				'Last Year',
				moment().subtract(1, 'year').startOf('year'),
				moment().subtract(1, 'year').endOf('year'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.YearToDate: {
			result.push(new StatsRequestDate(
				'Year to Date',
				moment().startOf('year'),
				moment().endOf('day'),
				StatType.Green
			));
			break;
		}
		case DateRangeType.CustomRange: {
			return this.processCustomRange(range);
		}
		default: {
			break;
		}
	}
	return result;
}


makeRequest$(range: DateRange): Observable<any> {
	const requestArray: StatsRequestDate[]  = this.processDateRange(range);

	const observableArray = requestArray.map( request => this.StatsProvider.getStatsbyDate$(request.startUnix, request.endUnix ));
	let i = 0;
	return Observable
		.concat(...observableArray)
		.pipe(
			map(statRes => {
				return <Stat> {
					title: {
						dateName: requestArray[i].title,
						dateRange: requestArray[i].dateRange
					},
					summary: {
						grossSales: statRes.data.orders.amount || 0,
						estProfit: statRes.data.orders.profit,
						roi: Number(Number(statRes.data.orders.roi * 100).toFixed(2)),
						margin: 0
					},
					orders: {
						total: statRes.data.orders.no || 0,
						organic: 0,
						ppc: 0
					},
					units: {
						total: statRes.data.items.no || 0,
						promos: statRes.data.items.promos.no || 0,
						refunds: statRes.data.items.refunds.no || 0
					},
					type: requestArray[i++].type,
				}
			})
		);
	}
}
