import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfig } from '../../app/app-config';

import { UserProvider } from "../user/user"



@Injectable()
export class ProductProvider {
	private url = AppConfig.ServiceBase + '/products/'; // URL to web api
    products: any = [];

  constructor(public http: HttpClient, public UserProvider: UserProvider) {
    console.log('Hello ProductProvider Provider');
  }

  find(): Promise<any> {
	return this.http
		.get(this.url, { headers: this.UserProvider.getHeaders() })
		.toPromise()
		.then(response => {
			this.products = response['data'];

			return Promise.resolve(this.products);
		})
		.catch(this.handleError);
	}
	private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
