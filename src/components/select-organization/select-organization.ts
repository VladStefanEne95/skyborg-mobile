import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { AmazonInfo } from '../../classes/amazon-info/amazon-info';


@Component({
  selector: 'select-organization',
  templateUrl: 'select-organization.html'
})
export class SelectOrganizationComponent implements OnInit {

	organizationsNameArr: Array<string>;
	organizationJson; organizationsLength; organizations;


	constructor(public storage: Storage) {
		console.log('Hello SelectOrganizationComponent Component');
		
	}

	ngOnInit() {
		this.organizationsNameArr = [];
		this.storage.get("organizations").then(organizationObj => {
			if (organizationObj) {
				this.organizationJson = JSON.parse(organizationObj);
				this.organizationsLength = this.organizationJson.length;
			
				for (let i = 0; i < this.organizationsLength; i++) {
					this.organizationsNameArr.push(this.organizationJson[i].name)
				}
				this.storage.get("organization").then(organizationObj => {
					this.organizations = JSON.parse(organizationObj).name;
				})
			}
		})
	}
  
	public optionsFn(): void {
			for (let i = 0; i < this.organizationsLength; i++) {
				if (this.organizationsNameArr[i] == this.organizations) {
					this.storage.set("organization", JSON.stringify(this.organizationJson[i])).then(() => {
						let marketplaces = this.organizationJson[i].marketPlaces;
						let marketplacesLength = marketplaces.length;
						if (marketplacesLength == 1)
							this.storage.set('marketplace', marketplaces[0]).then(() => location.reload());
						else {
							for (let j = 0; j < marketplacesLength; j++) {
								if (marketplaces[j] == 'ATVPDKIKX0DER') {
									this.storage.set('marketplace', marketplaces[j]).then(() => location.reload());
									return;
								}
							}
								this.storage.set('marketplace', marketplaces[0]).then(() => location.reload())
						}
					});
				}
			}
	}


}
