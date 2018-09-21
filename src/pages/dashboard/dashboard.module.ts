import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ChartComponent } from '../../components/chart/chart';


@NgModule({
  declarations: [
	DashboardPage,
	ChartComponent
  ],
  imports: [
	IonicPageModule.forChild(DashboardPage),,
	ChartComponent
  ],
})
export class DashboardPageModule {}
