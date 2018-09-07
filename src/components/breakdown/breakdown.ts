import { Component, Input } from '@angular/core';
import { OrderProvider } from '../../providers/order/order';
import { DateRange } from '../../pages/date-filter/date-range.interface';
/**
 * Generated class for the BreakdownComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'breakdown',
  templateUrl: 'breakdown.html'
})
export class BreakdownComponent {
	@Input() data: any;
	@Input() dateRange: DateRange;
	information: any[];
    panelOpenState: boolean = false;
    constructor(public orderProvider: OrderProvider) { }

    ngOnInit() {
		var acc = document.getElementsByClassName("withChildren");
		var i;
		
		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight){
			  panel.style.maxHeight = null;
			} else {
			  panel.style.maxHeight = panel.scrollHeight + "px";
			} 
		  });
		}
        this.getData();
    }

    getData() {
        this.orderProvider.getOrdersSalesStats([
            { name: 'beginDate', value: this.dateRange.start }, 
            { name: 'endDate', value: this.dateRange.end },
            { name: 'reportTime', value: 'daily' }
        ], []).then(result =>{
			this.data = result[0];
			this.information = this.data;
        }, err => {
        	console.log(err.errors.message);
        })
	}
	
	toggleSection(i) {
		this.information[i].open = !this.information[i].open;
	  }
	 
	toggleItem(i, j) {
	this.information[i].children[j].open = !this.information[i].children[j].open;
	}

}
