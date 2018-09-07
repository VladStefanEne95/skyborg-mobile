import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ChartComponent } from '../../components/chart/chart';
import { DashboardNewPage } from '../dashboard-new/dashboard-new';

@NgModule({
  declarations: [
	DashboardPage,
	DashboardNewPage,
	ChartComponent
  ],
  imports: [
	IonicPageModule.forChild(DashboardPage),,
	ChartComponent,
	DashboardNewPage
  ],
})
export class DashboardPageModule {}
