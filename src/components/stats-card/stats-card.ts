import { Component } from '@angular/core';

/**
 * Generated class for the StatsCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'stats-card',
  templateUrl: 'stats-card.html'
})
export class StatsCardComponent {

  text: string;

  constructor() {
    console.log('Hello StatsCardComponent Component');
    this.text = 'Hello World';
  }

}
