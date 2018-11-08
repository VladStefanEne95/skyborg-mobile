import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { UserProvider } from '../providers/user/user';

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
	 private oneSignal: OneSignal, public userProvider: UserProvider) {
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

  private onPushReceived(payload: OSNotificationPayload) {
	alert('Push recevied:' + payload.body);
}

private onPushOpened(payload: OSNotificationPayload) {
	alert('Push opened: ' + payload.body);
}

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
	  this.splashScreen.hide();

	  if ((<any>window).cordova){
		this.oneSignal.startInit('e5796dac-1863-4322-ac52-da2ba202bbff', '593294311877');
		//not sure if get perm returns a promise or the code is sync
		this.oneSignal.getPermissionSubscriptionState().then(status => {
			//user provider savedevice method should be called
			this.userProvider.saveDevice(status.subscriptionStatus.userId);
		})
		  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
		  this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
		  this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
		  this.oneSignal.endInit();
	  }
	});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
