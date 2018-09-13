import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardNewPage } from '../pages/dashboard-new/dashboard-new';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ChartComponent } from '../components/chart/chart';
import { BreakdownComponent } from '../components/breakdown/breakdown';
import { StatsCardComponent } from '../components/stats-card/stats-card';
import { DateFilterComponent } from '../components/date-filter/date-filter';
import { SelectMarketplaceComponent } from '../components/select-marketplace/select-marketplace';
import { SelectOrganizationComponent } from '../components/select-organization/select-organization';


import { SlickModule } from 'ngx-slick';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { OrderProvider } from '../providers/order/order';
import { ProgressBarProvider } from '../providers/progress-bar/progress-bar';
import { DashboardFilterProvider } from '../providers/dashboard-filter/dashboard-filter';
import { StatsProvider } from '../providers/stats/stats';
import { StorageProvider } from '../providers/storage/storage';
import { CalendarModule } from "ion2-calendar";



@NgModule({
  declarations: [
    MyApp,
	HomePage,
	LoginPage,
	ChartComponent,
	BreakdownComponent,
	DateFilterComponent,
	DashboardNewPage,
	StatsCardComponent,
	SelectMarketplaceComponent,
	SelectOrganizationComponent,
	DashboardPage,
    ListPage
  ],
  imports: [
	BrowserModule,
	CommonModule,
	BrowserAnimationsModule,
	SlickModule.forRoot(),
	HttpClientModule,
	IonicStorageModule.forRoot(),
	IonicModule.forRoot(MyApp),
	CalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	DashboardPage,
	DashboardNewPage,
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
