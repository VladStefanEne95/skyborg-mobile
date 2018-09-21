import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardV3Page } from './dashboard-v3';

@NgModule({
  declarations: [
    DashboardV3Page,
  ],
  imports: [
    IonicPageModule.forChild(DashboardV3Page),
  ],
})
export class DashboardV3PageModule {}
