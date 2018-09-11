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
	result.push(new StatsRequestDate(
		'7 Days',
		startDate.clone().subtract(7, 'days').startOf('day'),
		endDate.clone().subtract(1, 'days').endOf('day'),
		StatType.Blue
	));
	result.push(new StatsRequestDate(
		'14 Days',
		startDate.clone().subtract(14, 'days').startOf('day'),
		endDate.clone().subtract(1, 'days').endOf('day'),
		StatType.Orange
	));
	result.push(new StatsRequestDate(
		'30 days',
		startDate.clone().subtract(30, 'days').startOf('day'),
		endDate.clone().subtract(1, 'days').endOf('day'),
		StatType.Red
	));
	return result;
}

processCustomRange(range: DateRange): StatsRequestDate[] {
	const result: StatsRequestDate[] = [];
	const numberOfDays = range.end.diff(range.start, 'days');
	console.log('CUSTOM RANGE', numberOfDays);
	if (numberOfDays === 0) {
		const isToday = moment().diff(range.end, 'days') === 0;
		return this.processOneDay(isToday ? undefined : range);
	}
	if (numberOfDays > 0 && numberOfDays <= 7) {
		result.push(new StatsRequestDate(
			'Custom Range',
			range.start.clone().startOf('day'),
			range.end.clone().endOf('day'),
			StatType.Green
		));
		result.push(new StatsRequestDate(
			'Same Time Prev Week',
			range.start.clone().subtract(1, 'weeks').startOf('day'),
			range.end.clone().subtract(1, 'weeks').endOf('day'),
			StatType.Blue
		));
		result.push(new StatsRequestDate(
			'Same Time Prev Year',
			range.start.clone().subtract(1, 'years').startOf('day'),
			range.end.clone().subtract(1, 'years').endOf('day'),
			StatType.Orange
		));
	}
	if (numberOfDays > 7 && numberOfDays <= 30) {
		result.push(new StatsRequestDate(
			'Custom Range',
			range.start.clone().startOf('day'),
			range.end.clone().endOf('day'),
			StatType.Green
		));
		result.push(new StatsRequestDate(
			'Same Time Prev Month',
			range.start.clone().subtract(1, 'months').startOf('day'),
			range.end.clone().subtract(1, 'months').endOf('day'),
			StatType.Blue
		));
		result.push(new StatsRequestDate(
			'Same Time Prev Year',
			range.start.clone().subtract(1, 'years').startOf('day'),
			range.end.clone().subtract(1, 'years').endOf('day'),
			StatType.Orange
		));
	}
	if (numberOfDays > 30) {
		result.push(new StatsRequestDate(
			'Custom Range',
			range.start.clone().startOf('day'),
			range.end.clone().endOf('day'),
			StatType.Green
		));
		result.push(new StatsRequestDate(
			'Same Time Prev Year',
			range.start.clone().subtract(1, 'years').startOf('day'),
			range.end.clone().subtract(1, 'years').endOf('day'),
			StatType.Orange
		));
	}
	return result;
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
			result.push(new StatsRequestDate(
				'7 Days',
				moment().subtract(9, 'days').startOf('day'),
				moment().subtract(2, 'days').endOf('day'),
				StatType.Blue
			));
			result.push(new StatsRequestDate(
				'14 Days',
				moment().subtract(16, 'days').startOf('day'),
				moment().subtract(2, 'days').endOf('day'),
				StatType.Orange
			));
			result.push(new StatsRequestDate(
				'30 days',
				moment().subtract(32, 'days').startOf('day'),
				moment().subtract(2, 'days').endOf('day'),
				StatType.Red
			));
			break;
		}
		case DateRangeType.Last7Days: {
			result.push(new StatsRequestDate(
				'Last 7 Days',
				moment().subtract(8, 'days').startOf('day'),
				moment().subtract(1, 'days').endOf('day'),
				StatType.Green
			));
			result.push(new StatsRequestDate(
				'Same Time Prev Week',
				moment().subtract(15, 'days').startOf('day'),
				moment().subtract(8, 'days').endOf('day'),
				StatType.Blue
			));
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(53, 'weeks').startOf('day'),
				moment().subtract(52, 'weeks').endOf('day'),
				StatType.Orange
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
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(13, 'months').startOf('day'),
				moment().subtract(12, 'months').endOf('day'),
				StatType.Blue
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
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(14, 'months').startOf('day'),
				moment().subtract(12, 'months').endOf('day'),
				StatType.Blue
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
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(15, 'months').startOf('day'),
				moment().subtract(12, 'months').endOf('day'),
				StatType.Blue
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
			result.push(new StatsRequestDate(
				'Same Time Prev Month',
				moment().subtract(1, 'month').startOf('month'),
				moment().subtract(1, 'month').endOf('month'),
				StatType.Blue
			));
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(1, 'years').startOf('month'),
				moment().subtract(1, 'years'),
				StatType.Orange
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
			result.push(new StatsRequestDate(
				'Same Time Prev Month',
				moment().subtract(2, 'month').startOf('month'),
				moment().subtract(2, 'month').endOf('month'),
				StatType.Blue
			));
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(13, 'month').startOf('month'),
				moment().subtract(13, 'month').endOf('month'),
				StatType.Orange
			));
			break;
		}
		case DateRangeType.ThreeMonthsAgo: {
			result.push(new StatsRequestDate(
				'Three Months Ago',
				moment().subtract(2, 'month').startOf('month'),
				moment().subtract(2, 'month').endOf('month'),
				StatType.Green
			));
			result.push(new StatsRequestDate(
				'Same Time Prev Month',
				moment().subtract(3, 'month').startOf('month'),
				moment().subtract(3, 'month').endOf('month'),
				StatType.Blue
			));
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(14, 'month').startOf('month'),
				moment().subtract(14, 'month').endOf('month'),
				StatType.Orange
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
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(2, 'year').startOf('year'),
				moment().subtract(2, 'year').endOf('year'),
				StatType.Blue
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
			result.push(new StatsRequestDate(
				'Same Time Prev Year',
				moment().subtract(1, 'year').startOf('year'),
				moment().subtract(1, 'year').endOf('day'),
				StatType.Blue
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
