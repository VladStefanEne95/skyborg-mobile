import { Component, Input } from '@angular/core';
import {Stat, StatType} from '../../models/dashboard/dashboardTypes';

@Component({
  selector: 'stats-card',
  templateUrl: 'stats-card.html'
})
export class StatsCardComponent {

	@Input() stat: Stat;

  constructor() {
    console.log('Hello StatsCardComponent Component');
  }

  getTitleColor(index) {
	
	switch(index) {
		case 0:
			return "days1";
		case 1:
			return "days7";
		case 2:
			return "days14";
		case 3:
			return "days30";
		default:
			return "days1"
	}
}

}
