import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { CarouselPage } from '../pages/carousel/carousel';

import { SlickModule } from 'ngx-slick';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { OrderProvider } from '../providers/order/order';
import { ProgressBarProvider } from '../providers/progress-bar/progress-bar';
import { DashboardFilterProvider } from '../providers/dashboard-filter/dashboard-filter';
import { StatsProvider } from '../providers/stats/stats';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
	HomePage,
	LoginPage,
	CarouselPage,
	DashboardPage,
    ListPage
  ],
  imports: [
	BrowserModule,
	CommonModule,
	SlickModule.forRoot(),
	HttpClientModule,
	IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	CarouselPage,
	DashboardPage,
	LoginPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OrderProvider,
    ProgressBarProvider,
    DashboardFilterProvider,
    StatsProvider,
    StatsProvider,
    StorageProvider
  ]
})
export class AppModule {}
