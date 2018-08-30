import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators/map';
import { AppConfig } from './../../app/app-config';

import { UserProvider } from '../user/user';

import { StatsResponse } from '../../models/dashboard/dashboardTypes'


@Injectable()
export class StatsProvider {

    private url = AppConfig.ServiceBase + '/orders/stats/';
	
	constructor(private http: HttpClient, private UserProvider: UserProvider) {

		console.warn('DASHBOARD CONSTRUCTOR CALLED');
	}

	getStatsbyDate$(beginDate: number, endDate: number, inSeconds: boolean = false, sku?: string): Observable<any> {
		const url = `${this.url}beginDate:${beginDate}|endDate:${endDate}|timeSet:${inSeconds ? 'ms' : 's'}`;
		const httpHeaders = new HttpHeaders(this.UserProvider.getNewHeaders())
			.set('observe', 'response');
		
		return this.http.get<StatsResponse>(url, { headers: httpHeaders })
	}

}
