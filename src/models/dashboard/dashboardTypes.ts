import { Moment } from 'moment';

export class ProductDetails {
    ASIN: string;
    ROI: number;
    SKU: string;
    advertising: number;
    amount: number;
    brandName: string;
    currency: string;
    items: Object;
    netProfit: number;
    orders: Object;
    services: number;
    thumbUrl: string;
    variation: Array<Object>;
    tags: Array<string>;
    _id: string;
    internalName: string;
}

export enum StatType {
    Green,
    Blue,
    Orange,
    Red,
}

export class Stat {
    title: { dateName: string, dateRange: string };
    summary: { grossSales: number, estProfit: number, roi: number, margin: number };
    orders: { total: number, organic: number, ppc: number };
    units: { total: number, promos: number, refunds: number };
    type: StatType;

    public static fromJSON(data): Stat {
        const stat: Stat = new Stat();
        if (data) {
            stat.title = {
                dateName: data.title.dateName || '',
                dateRange: data.title.dateRange || '',
            };
            stat.summary = {
                grossSales: data.summary.grossSales || 0,
                estProfit: data.summary.estProfit || 0,
                roi: data.summary.roi || 0,
                margin: data.summary.margin || 0,
            };
            stat.orders = {
                total: data.orders.total || 0,
                organic: data.orders.organic || 0,
                ppc: data.orders.ppc || 0,
            };
            stat.units = {
                total: data.units.total || 0,
                promos: data.units.promos || 0,
                refunds: data.units.refunds || 0,
            };
            stat.type = data.type;
        }
        return stat;
    }

    isValid(): boolean {
        return this.summary && this.summary.grossSales !== undefined
            && this.orders && this.orders.total !== undefined
            && this.units && this.units.promos !== undefined && this.units.refunds !== undefined;
    }
}

export class StatsResponse {
    data: {
        orders: {
            no: number,
            amount: number,
            costs: number,
            fees: number,
            margin: number,
            profit: number,
            roi: number
        },
        items: {
            no: number,
            refunds: {
                no: number,
                amount: number
            },
            promos: {
                no: number,
                amount: number
            }
        },
        currency: string
    };
    status: number;
    errors: object;
}

export class StatsRequestDate {

    constructor(public title: string, public start: Moment, public end: Moment, public type: StatType) {
    }

    get fullDateRange(): string {
        return `${this.start.format('MM/DD/YYYY')} - ${this.end.format('MM/DD/YYYY')}`;
    }

    get dateRange(): string {
        if (this.end.isSame(this.start, 'day')) {
            return this.start.format('MM/DD/YYYY');
        }
        return this.fullDateRange;
    }

    get startUnix(): number {
        return this.start.unix();
    }

    get endUnix(): number {
        return this.end.unix();
    }
}
