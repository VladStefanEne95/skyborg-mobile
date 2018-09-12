import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { AmazonInfo } from '../../classes/amazon-info/amazon-info';



@Component({
  selector: 'select-marketplace',
  templateUrl: 'select-marketplace.html'
})
export class SelectMarketplaceComponent implements OnInit {

 marketPlacesArr: Array<string>;
 marketplaces;
 marketplaceId;

  constructor(public userProvider: UserProvider, public storage: Storage) {
	console.log('Hello SelectMarketplaceComponent Component');
  }

  ngOnInit() {
	  this.marketPlacesArr = [];
	  this.storage.get("marketplace").then(market => {
			if (market) {
				this.storage.get("organization").then(val => {
					if (val) {
						let valJson = JSON.parse(val);
						let marketPlacesArrId = valJson["marketPlaces"];
						marketPlacesArrId.map(value => {
							AmazonInfo.marketplaces.map(amazon => {
								if (amazon.id == value)
									this.marketPlacesArr.push(amazon.region);
								if (amazon.id == market) {
									this.marketplaces = amazon.region
									this.marketplaceId = amazon.id;
								}
							})
						})
					}
				})
			}
	  })
  }

  public optionsFn(): void {
	AmazonInfo.marketplaces.map(amazon => {
		if (amazon.region == this.marketplaces) {
			this.marketplaceId = amazon.id;
			this.storage.set("marketplace", this.marketplaceId).then(() => location.reload())
		}
	})
  }

}
