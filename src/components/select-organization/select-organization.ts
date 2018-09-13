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
				this.organizations = this.organizationJson[0].name;
			}
		})
	}
  
	public optionsFn(): void {
		
			for (let i = 0; i < this.organizationsLength; i++) {
				if (this.organizationsNameArr[i] == this.organizations) {
					this.storage.set("organization", JSON.stringify(this.organizationJson[i])).then(() => location.reload());
				}
			}
	}


}
