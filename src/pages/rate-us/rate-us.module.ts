import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RateUs } from './rate-us';

@NgModule({
  declarations: [
    RateUs,
  ],
  imports: [
    IonicPageModule.forChild(RateUs),
  ],
  exports: [
    RateUs
  ]
})
export class RateUsModule {}
