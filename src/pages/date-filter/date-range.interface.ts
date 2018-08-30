import { Moment } from 'moment';

export enum DateRangeType {
    Today,
    Yesterday,
    Last7Days,
    Last30Days,
    Last60Days,
    Last90Days,
    ThisMonth,
    LastMonth,
    ThreeMonthsAgo,
    LastYear,
    YearToDate,
    CustomRange,
}

export class DateRange {
    intervalType: DateRangeType;
    title: string;
    start: Moment;
    end: Moment;
}
