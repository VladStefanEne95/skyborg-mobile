import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { HijacksPage } from '../pages/hijacks/hijacks';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardV3Page } from '../pages/dashboard-v3/dashboard-v3';


import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
	 public splashScreen: SplashScreen, public storage: Storage,
	 private oneSignal: OneSignal) {
    this.initializeApp();

	// let self = this;
	// storage.get("loggedIn").then(val => {
	// 	if (val === true)
	// 		self.rootPage = DashboardPage;
	// 	else
	// 		self.rootPage = LoginPage;
	// })
    // used for an example of ngFor and navigation
    this.pages = [
	  { title: 'Home', component: HomePage },
	  { title: 'Dashboard', component: DashboardPage },
	  { title: 'Login', component: LoginPage },
	  { title: 'List', component: ListPage },
	  { title: 'DashboardNew', component: DashboardV3Page },
	  { title: 'Hijacks', component: HijacksPage }
	];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
	  this.splashScreen.hide();
	  //for app only
	//   this.oneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');
	  
	//   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
	  
	//   this.oneSignal.handleNotificationReceived().subscribe(() => {
	//    // do something when notification is received
	//   });
	  
	//   this.oneSignal.handleNotificationOpened().subscribe(() => {
	// 	// do something when a notification is opened
	//   });
	  
	//   this.oneSignal.endInit();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
