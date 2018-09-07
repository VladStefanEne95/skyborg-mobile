export interface ChartData {
    costsAmount: number;
    feesAmount: number;
    grossSales: number;
    maxDate: string;
    minDate: string;
    netAmount: number;
    netMargin: number;
    netROI: number;
    promosAmount: number;
    promosNumber: number;
    refundsAmount: number;
    refundsNumber: number;
    taxesAmount: number;
    taxesNumber: number;
    totalItems: number;
    totalOrders: number;
    _id: Object;
}

export interface MonthToDateVsLastMonth {
    lastMonth: Array<ChartData>;
    monthToDate: Array<ChartData>;
}
