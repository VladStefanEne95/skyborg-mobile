import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class HandleErrorProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HandleErrorProvider Provider');
  }


	handle(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		if (401 === error.status) {
			return Promise.reject(error._body);
		}
		try {
			return Promise.reject((JSON.parse(error._body)));
		} catch(err) {
			return Promise.reject(error);
		}
	}

}
