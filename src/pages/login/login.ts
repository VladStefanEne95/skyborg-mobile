import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { DashboardPage } from '../dashboard/dashboard';
import { DashboardV3Page } from '../dashboard-v3/dashboard-v3';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	private email: string;
	private password: string;
	private error: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public UserProvider: UserProvider, public storage: Storage) {
		this.storage.get('loggedIn').then(val => {
			if(val)
				this.navCtrl.push(DashboardV3Page);
		})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  

  login() {
		this.UserProvider.login(this.email, this.password)
			.then(response => {
				if(response === true)
					location.reload();
				//this.navCtrl.push(DashboardPage);
			})
			.catch(error => {
				alert("incorect username or password");
			})
  }

}
