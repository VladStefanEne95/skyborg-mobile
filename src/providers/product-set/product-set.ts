import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserProvider } from '../../providers/user/user';

import { ProductSet } from '../../models/product-set/product-set';
import { AppConfig } from '../../app/app-config'



@Injectable()
export class ProductSetProvider {

  private url = AppConfig.ServiceBase + '/productSets/';  // URL to web api

  constructor(public http: HttpClient, public UserProvider: UserProvider) {
    console.log('Hello ProductSetProvider Provider');
  }

  find(): Promise<any> {
	return this.http.get(this.url, { headers: this.UserProvider.getHeaders() })
		.toPromise()
		.then(response => {
			return Promise.resolve(response['data']);
		})
		.catch(this.handleError);
}

private handleError(error: any): Promise<any> {
	console.error('An error occurred', error); // for demo purposes only
	return Promise.reject(error.message || error);
}

}
