import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProgressBarProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ProgressBarProvider Provider');
  }

	private showProgressBar = false;
  
	show(): void {
		this.showProgressBar = true;
	}

	hide(): void {
		this.showProgressBar = false;
	}

	isProgressBarVisible(): boolean {
		return this.showProgressBar;
	}

}
