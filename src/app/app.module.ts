import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { OneSignal } from '@ionic-native/onesignal';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DashboardV3Page } from '../pages/dashboard-v3/dashboard-v3';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { HijacksPage } from '../pages/hijacks/hijacks';
import { ChartComponent } from '../components/chart/chart';
import { BreakdownComponent } from '../components/breakdown/breakdown';
import { StatsCardComponent } from '../components/stats-card/stats-card';
import { DateFilterComponent } from '../components/date-filter/date-filter';
import { SelectMarketplaceComponent } from '../components/select-marketplace/select-marketplace';
import { SelectOrganizationComponent } from '../components/select-organization/select-organization';
import { AddCardModalComponent } from '../components/add-card-modal/add-card-modal';
import {DpDatePickerModule} from 'ng2-date-picker';

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
import { HijacksProvider } from '../providers/hijacks/hijacks';
import { HandleErrorProvider } from '../providers/handle-error/handle-error';
import { StateProvider } from '../providers/state/state';
import { ProductProvider } from '../providers/product/product';
import { ProductSetProvider } from '../providers/product-set/product-set';
import { AppConfigurationsProvider } from '../providers/app-configurations/app-configurations';



@NgModule({
  declarations: [
    MyApp,
	HomePage,
	LoginPage,
	HijacksPage,
	ChartComponent,
	BreakdownComponent,
	DateFilterComponent,
	DashboardV3Page,
	StatsCardComponent,
	SelectMarketplaceComponent,
	SelectOrganizationComponent,
	AddCardModalComponent,
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
	DpDatePickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	HomePage,
	HijacksPage,
	DashboardPage,
	DashboardV3Page,
	AddCardModalComponent,
	LoginPage,
    ListPage
  ],
  providers: [
    StatusBar,
	SplashScreen,
	InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    OrderProvider,
    ProgressBarProvider,
    DashboardFilterProvider,
    StatsProvider,
	StatsProvider,
	OneSignal,
    StorageProvider,
    HijacksProvider,
    HandleErrorProvider,
    StateProvider,
    ProductProvider,
    ProductSetProvider,
    AppConfigurationsProvider
  ]
})
export class AppModule {}
