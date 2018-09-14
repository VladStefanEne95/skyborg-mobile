import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HijacksPage } from './hijacks';

@NgModule({
  declarations: [
    HijacksPage,
  ],
  imports: [
    IonicPageModule.forChild(HijacksPage),
  ],
})
export class HijacksPageModule {}
