import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './../../app/app-config';
import { UserProvider } from '../../providers/user/user';
import { HandleErrorProvider } from '..//handle-error/handle-error';



@Injectable()
export class AppConfigurationsProvider {


	private url = AppConfig.ServiceBase + '/appConfigs/';  // URL to web api

  constructor(public http: HttpClient, private UserProvider: UserProvider, private HandleErrorProvider: HandleErrorProvider ) {
    console.log('Hello AppConfigurationsProvider Provider');
  }

  updateDashboardCards(dateRange: any, metrics: any): Promise<any> {
	let newDetails = { cards: dateRange, options: metrics };
	return this.http.post(this.url, JSON.stringify({ name : "dashboard", details : newDetails }), {headers : this.UserProvider.getHeaders()})
		.toPromise()
		.then(response => {
			return response;
		})
 }

 getDashboardCards(): Promise<any> {
	return this.http.get(this.url + "dashboard", { headers: this.UserProvider.getHeaders() })
	.toPromise()
	.then(response => { 
		return response 
	})
	.catch(err =>{ 
		if (err.status == 404)
			console.log(err);
		else
			this.HandleErrorProvider.handle(err)
	})
 }

}
