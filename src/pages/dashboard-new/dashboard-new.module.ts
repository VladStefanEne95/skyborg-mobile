import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardNewPage } from './dashboard-new';

@NgModule({
  declarations: [
    DashboardNewPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardNewPage),
  ],
})
export class DashboardPageModule {}
