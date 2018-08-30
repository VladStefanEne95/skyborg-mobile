import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarouselPage } from './carousel';

@NgModule({
  declarations: [
    CarouselPage,
  ],
  imports: [
    IonicPageModule.forChild(CarouselPage),
  ],
})
export class CarouselPageModule {}
