import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../../models/user/user';
import { AppConfig } from './../../app/app-config';
import { Storage } from '@ionic/storage';

import { AmazonInfo } from '../../classes/amazon-info/amazon-info';


@Injectable()
export class UserProvider {
	password: string;
	email: string;
	headers = new HttpHeaders({
		'Content-Type': 'application/json'
	});

    newHeaders: any = {
        'Content-Type': 'application/json',
    };

    loggedIn = false;
    errorPage = false;
    loadingLoginInAmazon = false;
    loadingLogoutInAmazon = false;
    scroll = true;
    token: any = null;
    tokenExpire = 0;
    user: User = null;
    loading = false;
    error: any = null;
    success: boolean = null;
    organization: any = null;
    marketplace: any = null;
    marketplaces: any = [];
    selectedOrganizationId = '';
    organizations: any = null;
    signature: any = {
        organizationId: null,
        text: 'Signature not loaded.'
    };
    dialogRef:any = null;

	private usersURL = AppConfig.ServiceBase + '/users/';  // URL to users
	private actionsURL = AppConfig.ServiceBase + '/action/';  // URL to actions
    private organizationsURL = AppConfig.ServiceBase + '/organizations/';  // URL to users
    private loginURL = AppConfig.ServiceBase + '/oauth/token/';  // URL to web api
	

  constructor(public http: HttpClient, public storage: Storage) {

    console.log('Hello UserProvider Provider');

	this.storage.get('organization').then(val => {
		this.organization = JSON.parse(val);
		
		if (this.organization !== null) {
			this.selectedOrganizationId = this.organization._id;

			this.organization.marketPlaces.forEach(m => {
				this.marketplaces.push(AmazonInfo.marketplaces.filter(mP => m.toString() === mP.id.toString())[0]);
			});
		}
	})

	this.storage.get('marketplace').then(val => {
		if (val)
			this.marketplace = val;
	})

	this.storage.get('organizations').then(val => {
		if (val)
			this.organizations = JSON.parse(val);
	})

	this.storage.get('token').then(val => {
		if (this.token === null && val) {
			this.token = {};
			this.token.access_token = val
			this.headers = new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.token.access_token,
				'Skyborg-Organization': this.selectedOrganizationId,
				'Skyborg-Marketplace': this.marketplace, 
			});
			const token = 'Bearer ' + this.token.access_token;
			this.newHeaders = {
				'Content-Type': 'application/json',
				'Authorization': token,
				'Skyborg-Organization': this.selectedOrganizationId,
				'Skyborg-Marketplace': this.marketplace,
			};	
		}
	})


	this.storage.get('tokenExpire').then(val => {
		if (val)
			this.tokenExpire = Number(val);
	})
	
	this.storage.get('user').then(val => {
		if (val) {
			this.user = JSON.parse(val);
			this.loggedIn = true;
		}
	})
  }


  ngOnInit() {
	
}

  login(email: string, password: string): Promise<boolean> {
	this.clear();

	this.loading = true;

	this.headers = new HttpHeaders({
		'Content-Type': 'application/json',
	});

	this.newHeaders = {
		'Content-Type': 'application/json',
	};

	return this.authorize(email, password)
		.then(response => {
			return this.getToken(email, password, response.data.clientId, response.data.clientSecret);
		})
		.then(response => {
			return this.getInfo();
		}) 
		.then(response => {
			this.refreshOrganizations();
			this.headers = new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.token.access_token,
				'Skyborg-Organization': this.selectedOrganizationId,
				'Skyborg-Marketplace': this.marketplace,
			});
			this.newHeaders = {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + this.token.access_token,
				'Skyborg-Organization': this.selectedOrganizationId,
				'Skyborg-Marketplace': this.marketplace,
			};

			this.loggedIn = true;
			this.storage.set("loggedIn", true);
			this.loading = false;

			return true;
		})
		.catch(err => {
			this.error = err.errors;

			this.loading = false;
			this.loggedIn = false;
			this.storage.set("loggedIn", false);
			console.log(err);
			return false;
		});
	}
	
	authorize(email : string, password : string): Promise<any>{
		return this.http.post(this.usersURL + "authorize", JSON.stringify({ email : email, password : password }), {headers : this.headers})
			.toPromise()
			.then(response => {
				return response;
			})
	}


    refreshOrganizations(): void {
		this.storage.set('organizations', JSON.stringify(this.organizations))
        for (let i = 0; i < this.organizations.length; i++) {
            if (this.organizations[i]._id.toString() === this.organization._id.toString()) {
                this.organization = this.organizations[i];

                this.setOrganization(this.organization);

                break;
            }
        }
	}


	changeMarketplace(marketplace) {
        this.setMarketplace(marketplace);
        location.reload();
    }

	setMarketplace(marketplace): void {
        this.storage.set('marketplace', marketplace.id);
        this.marketplace = marketplace.id;
    }
	
	getMarketplace(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.storage.get('marketplace').then(val => {
				if (val)
					resolve(val);
				else
					resolve(null);
			})
		})
	}
	

	setOrganization(organization): void {
		this.storage.set('organization', JSON.stringify(organization));
        this.selectedOrganizationId = organization._id;
        this.organization = organization;
		this.marketplaces = organization.marketPlaces;
		let marketplacesLength = this.marketplaces.length;
		if (marketplacesLength == 1)
			this.storage.set('marketplace', this.marketplaces[0]);
		else {
			for (let i = 0; i < marketplacesLength; i++) {
				if (this.marketplaces[i] == 'ATVPDKIKX0DER') {
					this.storage.set('marketplace', this.marketplaces[i]);
					return;
				}
				this.storage.set('marketplace', this.marketplaces[0])
			}
		}
        console.log('+++MARKETPLACE', this.marketplace);
    }

	getToken(username : string, password : string, clientId : string, clientSecret : string): Promise<any>{
        return this.http.post(this.loginURL, JSON.stringify({ grant_type : "password", username : username, password : password, client_id : clientId, client_secret : clientSecret }), {headers : this.headers})
            .toPromise()
            .then(response => {
				this.loggedIn = true;
				this.token = response;

				this.storage.set('token', this.token.access_token);
				let now = new Date();
				this.storage.set("tokenExpire", String(now.getTime() + (parseInt(this.token.expires_in) * 1000)) );

                this.headers = new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer ' + this.token.access_token
                });

                return this.token;
            })
            .catch(this.handleError);
    }

	clear(): void {
		let obj = this;

		obj.loggedIn = false;
		this.storage.set("loggedIn", obj.loggedIn);
		obj.token = null;
		obj.user = null;
		obj.organization = null;
		obj.organizations = null;
		obj.loading = false;
		obj.error = null;
		obj.success = false;
		obj.tokenExpire = 0;
	}

    getHeaders(): any {
        return this.headers;
    }

    getInfo(): Promise<any> {
        return Promise.all([this.getUser(), this.getOrganizations()]);
	}
	
	getUser(): Promise<any> {
        return this.http.get(this.usersURL, { headers: this.headers })
            .toPromise()
            .then(response => {
				this.user = response['data'];
				this.storage.set('user', JSON.stringify(this.user));

                return this.user;
            })
            .catch(this.handleError)
    }

    getOrganizations(): Promise<any> {
        return this.http.get(this.organizationsURL, { headers: this.headers })
            .toPromise()
            .then(response => {
                this.organizations = response['data'];
                if (this.organizations.length > 0) {
                    this.organizations[0].selected = true;

                    this.organization = this.organizations[0];
					this.selectedOrganizationId = this.organization._id;
					
					this.storage.set('organization', JSON.stringify(this.organization));
					this.storage.set('organizations', JSON.stringify(this.organizations));
				}
				
                return this.organizations;
            })
            .catch(this.handleError);
	}
	
	getNewHeaders(): any {
		return this.newHeaders;
    }
	
	private handleError(error: any): Promise<any> {
        if (401 === error.status) {
            return Promise.reject(error._body);
        }

        try {
            return Promise.reject((JSON.parse(error._body)));
        } catch(err) {
            return Promise.reject(error._body);
        }
    }

}
