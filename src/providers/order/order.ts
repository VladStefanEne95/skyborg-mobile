import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../app/app-config';
import { UserProvider } from "../user/user";
import * as isDefined from 'check-defined';

import { Order } from '../../models/order/order';
import { DateRange } from '../../pages/date-filter/date-range.interface';

@Injectable()
export class OrderProvider {

	private url = AppConfig.ServiceBase + '/orders/';  // URL to web api

  constructor(public http: HttpClient, private UserProvider: UserProvider) {
    console.log('Hello OrderProvider Provider');
  }

  getOrderProductSales(sort: string, by: any[]): Promise<any> {
	let url = `${this.url}products/sales/sort/`;
	
	const byArray = [];
	by.forEach(b => {
		byArray.push(b.name + ':'  + b.value);
	});
	let byString = '*';
	if (0 < byArray.length) {
		byString = byArray.join('|');
	}

	url += `${sort}/${ byString }`;

	return this.http.get(url, { headers: this.UserProvider.getHeaders() })
		.toPromise()
		.then(response => response['data'])
		.catch(this.handleError);
}

	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
	}
	
    getOrdersSalesStats(by: any[], sort: any[], pageSize: number = 100, pageNumber: number = 1) {
        let url = `${this.url}sales-stats/`;

        const byArray = [];
        by.forEach(b => {
            byArray.push(b.name + ':'  + b.value);
        });
        let byString = '*';
        if (0 < byArray.length) {
            byString = byArray.join('|');
        }

        const sortArray = [];
        sort.forEach(b => {
            if (isDefined(b, 'value')) {
                sortArray.push(b.name + ':'  + b.value);
            } else {
                sortArray.push(b.name);
            }
        });
        let sortString = '*';
        if (0 < sortArray.length) {
            sortString = sortArray.join('|');
        }

        url += `${ byString }/${ sortString }/${ pageSize }/${ pageNumber }`;

        return this.http.get(url, {headers: this.UserProvider.getHeaders()})
        .toPromise()
        .then(response => response['data'])
        .catch(this.handleError);
    }

}
